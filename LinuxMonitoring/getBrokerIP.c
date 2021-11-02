#include "./getBrokerIP.h"

void getBrokerIP(char broker_address[]){

	FILE* addrFile;

	addrFile = fopen("./broker_ip.txt", "r"); // open broker_ip
        fscanf(addrFile, "%s", &broker_address[0]);

	fclose(addrFile);
}
