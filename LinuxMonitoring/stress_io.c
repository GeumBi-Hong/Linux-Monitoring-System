#include<stdio.h>
#include<stdlib.h>

int main(void){

	FILE* fp;
	char buf[100];
	char buf2[100] = "dsjfndsofbadofvndakfvndaokfvndsaovniovdasokncniadovnqeriovniads";

	while(1){
		while(!feof(fp)){
			fp = fopen("./dummy.txt", "r");
			fgets(buf, 100, fp);

		}
		fclose(fp);

		fp = fopen("./dummy.txt", "w");

		for(int i=0;i<100;i++){
			fwrite(buf2, 1, 100, fp);	
		}
		fclose(fp);

	}	
}	
