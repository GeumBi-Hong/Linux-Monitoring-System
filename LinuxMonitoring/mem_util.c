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
#define MEMORIES_NUM 3
#define PORT 9001

enum memories{TOTAL, FREE, AVAILABLE} mem_enum;

int main (void){
	char loadDataBuf[ONE_LINE] = {0};
	int memories[2][MEMORIES_NUM] = {0};
	char broker_address[100];
	char hostIP[40];

	FILE* memFile;

	//get broker IP address /in getBrokerIP.c
        getBrokerIP(broker_address);

        //get host IP   /in getIP.c
        getIP(hostIP);

	while(1){
		memFile = fopen("/proc/meminfo", "r"); //open meminfo

		fscanf(memFile, "%*s %d %*s", &memories[PRESENT][TOTAL]); fflush(stdin);
		fscanf(memFile, "%*s %d %*s", &memories[PRESENT][FREE]); fflush(stdin);
		fscanf(memFile, "%*s %d %*s", &memories[PRESENT][AVAILABLE]); fflush(stdin);

		float nom_mem = 100.0*(
		(memories[PRESENT][TOTAL]-memories[PRESENT][FREE])*1.0
			/memories[PRESENT][TOTAL]);

		float act_mem = 100.0*(
		(memories[PRESENT][TOTAL]-memories[PRESENT][AVAILABLE])*1.0
			/memories[PRESENT][TOTAL]);

		//make instruction
                char instruct[400] = {0};

                sprintf(instruct, "sudo mosquitto_pub -t 'mon/storeDB/MEM' -h %s -m '{ \"IP\" : \"%s\", \"timestamp\" : %d, \"nom_mem\" : %f, \"act_mem\" : %f }'", broker_address, hostIP, (int)time(NULL), nom_mem, act_mem);

                printf("%s\n", instruct);

		system(instruct);
	//end shell instruction

		memcpy(memories[PAST], memories[PRESENT], 
			sizeof(int)*MEMORIES_NUM);

		fclose(memFile);
		//close memFile	

		sleep(1);
	}

	return 0;
}
