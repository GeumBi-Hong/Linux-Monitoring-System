#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>

int main(void){
	pid_t pid;
	int i = 0;
	unsigned int sum = 0;
	int n[5000000] = {0};
	int p[5000000] = {0};
	int q[5000000] = {0};
	int r[5000000] = {0};

	while(1){
		pid = fork();
		if(pid>0){	//parent
			i++;
			if(i==4){
				i=0;
				sleep(1);
			}
		}
		else if(pid == 0){	//child
			printf("child : %d\n", getpid());
			//while(1){
				for(i=0; i<5000000; i++)
					n[i] = i;
				for(i=0; i<5000000; i++)
					p[i] = i;
				for(i=0; i<5000000; i++)
					q[i] = i;
				for(i=0; i<5000000; i++)
					r[i] = i;
				for(i=0; i<5000000; i++)
					r[i] += n[i];
				for(i=0; i<5000000; i++)
					n[i] = p[i];
				for(i=0; i<5000000; i++)
					p[i] = r[i] + n[i];
				for(i=0; i<5000000; i++)
					sum += p[i] + q[i] + n[i];
			//}
			printf("sum = %u\n", sum);	//put it in while
			return 0;
		}
		else{
			fprintf(stderr, "fork error");
			return 1;
		}
	}
}
