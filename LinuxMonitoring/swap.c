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
#define SWAP_NUM 3
#define PORT 9001

enum swaps{TOTAL, FREE, USAGE} swap_enum;

int file_scan_certain2(FILE* targetFile, char target[]){

        int result = 9999999;
        char temp[100];

        while(!feof(targetFile)){

                fscanf(targetFile, "%s", temp);
                if(!strcmp(temp, target)){
                        fscanf(targetFile, "%d", &result);
                        fflush(stdin);  return result;
                }
                else{
                        fscanf(targetFile, "%*d %*s");
                        fflush(stdin);
                }
        }       //end while

        return -1;
}


int main (void){
        float swap[SWAP_NUM] = {0};
        char broker_address[100];
        char hostIP[40];
        char instruct[400] = {0};

        FILE* statFile;
        FILE* meminfoFile;

        //get broker IP address /in getBrokerIP.c
        getBrokerIP(broker_address);

        //get host IP   /in getIP.c
        getIP(hostIP);

        meminfoFile = fopen("/proc/meminfo", "r");
        swap[TOTAL] = file_scan_certain2(meminfoFile, "SwapTotal:"); //fixed space

        while(1){
                 meminfoFile = fopen("/proc/meminfo", "r"); //open meminfo
                swap[FREE]  = file_scan_certain2(meminfoFile, "SwapFree:");
                swap[USAGE] = (swap[TOTAL] - swap[FREE]) / swap[TOTAL];

                float swap_usage = 100*swap[USAGE];
               // sprintf(swap_value, "%f", swap[USAGE]);
               //printf("Swap usage : %f %%\n", swap_usage);

                sprintf(instruct, "sudo mosquitto_pub -t 'mon/storeDB/SWAP' -h %s -m '{ \"IP\" : \"%s\", \"timestamp\" : %d, \"swap_usage\" : %f }'", broker_address, hostIP, (int)time(NULL), swap_usage);

                printf("%s\n", instruct);
                system(instruct);

                fclose(meminfoFile);

                sleep(1);
        }

        return 0;
}

