#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include <stdlib.h>
#include <time.h>
#include "./getIP.c"
#include "./getBrokerIP.c"

#define PAST 0
#define PRESENT 1
#define IO_NUM 2
#define PORT 9001

enum ios{READ, WRITE} io_enum;

int main (void){
	int io[2][IO_NUM] = {0};
	char broker_address[100];
	char hostIP[40];

	FILE* diskFile;

	//get broker IP address /in getBrokerIP.c
        getBrokerIP(broker_address);
	printf("%s", broker_address);

        //get host IP   /in getIP.c
        getIP(hostIP);

	while(1){
		diskFile = fopen("/proc/diskstats", "r"); //open diskstats

		int temp_read = 0, temp_write = 0;
		while(!feof(diskFile)){
			char buf[100];
			int read_buf = 0, write_buf = 0;
			fscanf(diskFile, "%*d %*d %*s %*d %*d %*d %d %*d %*d %*d %d", &read_buf, &write_buf); fgets(buf, 100, diskFile);
			temp_read += read_buf;
			temp_write += write_buf;
		}
		io[PRESENT][READ] = temp_read;
		io[PRESENT][WRITE] = temp_write;

		if(io[PAST][READ] != 0){
			float io_read = (io[PRESENT][READ]-io[PAST][READ])/1000.0;

			printf("%d %d\n", io[PRESENT][READ], io[PAST][READ]);
			float io_write =
				(io[PRESENT][WRITE]-io[PAST][WRITE])/1000.0;

			//make instruction
       	        	char instruct[400] = {0};

                	sprintf(instruct, "sudo mosquitto_pub -t 'mon/storeDB/IO' -h %s -m '{ \"IP\" : \"%s\", \"timestamp\" : %d, \"io_read\" : %f, \"io_write\" : %f }'", broker_address, hostIP, (int)time(NULL), io_read, io_write);

                	printf("%s\n", instruct);

			system(instruct);
		//end shell instruction
		}

		memcpy(io[PAST], io[PRESENT], 
			sizeof(int)*IO_NUM);

		fclose(diskFile);
		//close diskFile	

		sleep(1);
	}

	return 0;
}
