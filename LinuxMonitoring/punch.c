#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<unistd.h>

int main(void){

	while(1){
		system("stress --hdd 1 --hdd-bytes 1034m");

		sleep(3);
	}
}

