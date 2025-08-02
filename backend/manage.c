#include <windows.h>
#include <stdio.h>
#include <stdbool.h>
#include <stdlib.h>

bool run(char *option[], int args);

int main(int argc, char *argv[]) {
    if (argc < 3 && argc > 1) {
        if(run(argv, argc)) {
            printf("Command executed successfully");
        } else {
            printf("an error has occured");
            return 1;
        }
    } else if(argc > 2) {
        if(run(argv, argc)) {
            printf("Command executed successfully");
        } else {
            printf("an error has occured");
            return 1;
        }
    } else {
        printf("Syntax error.\nmanage <command>\n\n");
        printf("Command:\n");
        printf("manage runserver //Start a local server\n");
        printf("manage makemigrations //Make changes available for migration\n");
        printf("manage makemigrations <app_name>//Make specific changes available for migration\n");
        printf("manage migrate //Execute migration\n");
        printf("manage flush //Deletes all data from all tables\n");
        return 1;
    }
    return 0;
}

bool run(char *option[], int args) {
    char command[256]; 
    snprintf(command, sizeof(command), "python manage.py %s", option[1]);
    if(args < 3) {
        if(system(command) == 0) {
            return true;
        } else return false;
    } else {
        for(int i = 2; i < args; i++) {
            snprintf(command + strlen(command), sizeof(command) - strlen(command), "%s ", option[i]);
        }
        if(system(command) == 0) {
            return true;
        } else return false;
    }
}