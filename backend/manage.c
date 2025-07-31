#include <windows.h>
#include <stdio.h>
#include <stdbool.h>
#include <stdlib.h>

bool run(char *option);

int main(int argc, char *argv[]) {
    if (argc > 1) {
        if(run(argv[1])) {
            printf("Command executed successfully");
        } else {
            printf("an error has occured");
            return 1;
        }
    } else {
        printf("Syntax error.\nmanage <command>\n\n");
        printf("Command:\n");
        printf("manage runserver //Start a local server\n");
        printf("manage makemigrations //Make changes available for merging\n");
        printf("manage migrate //Execute migration\n");
        printf("manage flush //Deletes all data from all tables\n");
        return 1;
    }
    return 0;
}

bool run(char *option) {
    char command[256]; 
    snprintf(command, sizeof(command), "python manage.py %s", option);
    if(system(command) == 0) {
        return true;
    } else return false;
}