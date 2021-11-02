#include <sys/types.h>
#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>

int main(void){
	pid_t pid, ppid;
	int intTmp, intTmp2;

	//number of childs
	int intChildsCt = 10;
	//to get child_pid //don't need
	int intChilds[10];
	//memory allocation counts
	int intMemAllocCt = 100;
	//array to remember allocated memory pointer
	char *cpStr[100];
	//memory bytes per allocation
	int intMemSize = 10240000;

	//amount of page when divided into 4KB
	int intPageCt = intMemSize/4096;

	//get ppid
	ppid = getpid();

	pid = 1;

	//create child for intChildsCT
	for(intTmp=0; intTmp<intChildsCt; intTmp++){
		if(pid != 0){	//execute parent
			//fork() and get child pid, returns 0
			if((pid = fork())<0){
				printf("%d'th child process fork error\n", intTmp);
				return 2;
			}
			else if(pid != 0){	//parent remembers pid
				intChilds[intTmp] = pid;
			}
		}
	}

	//parent routine after for()
	if(pid != 0){
		printf("====ChildProcess List====\n");
		for(intTmp=0; intTmp<intChildsCt; intTmp++){
			printf("%d'st Child process pid: %d\n", intTmp, intChilds[intTmp]);
		}
	}

	//child routine after fork()
	if(pid == 0){
		printf("Child Routine...\n");

	//allocate memory for intMemAllocCt
	//allocated total is intChildsCt*intMemAlloc*intMemSize
	for(intTmp2=0;intTmp2<intMemAllocCt; intTmp2++){
		//malloc and save address in cpStr[]
		cpStr[intTmp2] = (char*)malloc(intMemSize);
		//write 'K' on all allocated bytes(CPU rate 100% when activated

		for(intTmp=0; intTmp<intMemSize; ++intTmp)*((char*)cpStr+intTmp)='K';

		printf("Child %d, Memory Allocate : %d\n", getpid(), intTmp2);
		sleep(1);
	}

	printf("ppid = %d, getpid = %d\n", ppid, getpid());
	//printf("%s\n", (char*)cpStr);

	//wait 10 sec
	sleep(10);

	//for each malloced cnts
	for(intTmp2=0; intTmp<intMemAllocCt; intTmp2++){
		//for malloced page cnts
		for(intTmp=1; intTmp<intPageCt; intTmp++){
			//write 'K' on each page to actually use/access page
			*((char*)cpStr[intTmp2]+(4096*intTmp)) = 'K';
		}
	}

	//access all malloc and wait 2 sec
	sleep(2);

	//free allocation
	for(intTmp2=0; intTmp2<intMemAllocCt; intTmp2++){
		free(cpStr[intTmp2]);
		printf("pid=%d, %d is free...\n", getpid(), intTmp2);
	}
}
	//terminate process
	return 0;
}



