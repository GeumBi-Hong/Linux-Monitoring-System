#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include <stdlib.h>
#include <time.h>
#include "./getIP.c"
#include "./getBrokerIP.c"

#define ONE_LINE 80
#define PAST 0
#define PRESENT 1
#define JIFFIES_NUM 4
#define PORT 9001

enum jiffy{USER, USER_NICE, SYSTEM, IDLE} jiffy_enum;

int main (void){
	char loadDataBuf[ONE_LINE] = {0};
	char cpuId[4] = {0};

	int jiffies[2][JIFFIES_NUM] = {0}, totalJiffies;
	int diffJiffies[JIFFIES_NUM];
	int idx;
	char broker_address[100];
	char hostIP[40];

	FILE* statFile;

	//get broker IP address	/in getBrokerIP.c
	getBrokerIP(broker_address);

	//get host IP	/in getIP.c
	getIP(hostIP);

	while(1){
		statFile = fopen("/proc/stat", "r");
		fscanf(statFile, "%s %d %d %d %d",
		cpuId, &jiffies[PRESENT][USER], &jiffies[PRESENT][USER_NICE],
		&jiffies[PRESENT][SYSTEM], &jiffies[PRESENT][IDLE]);
	
		for(idx = 0, totalJiffies = 0; idx< JIFFIES_NUM; ++idx){
			diffJiffies[idx] =
			 jiffies[PRESENT][idx] - jiffies[PAST][idx];
			totalJiffies = totalJiffies + diffJiffies[idx];
		}
		float cpu_util = 100.0*(1.0-(diffJiffies[IDLE]/
					(double)totalJiffies));

		//make instruction
		char instruct[400] = {0};

		sprintf(instruct, "sudo mosquitto_pub -t 'mon/storeDB/CPU' -h %s -m '{ \"IP\" : \"%s\", \"timestamp\" : %d, \"cpu_usage\" : %f }'", broker_address, hostIP, (int)time(NULL), cpu_util);

		printf("%s\n", instruct);
		system(instruct);	

		memcpy(jiffies[PAST], jiffies[PRESENT], 
			sizeof(int)*JIFFIES_NUM);

		fclose(statFile);

		sleep(1);
	}

	return 0;
}
