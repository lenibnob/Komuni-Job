#include <windows.h>
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {
    if (argc < 2) {
        printf("Usage: manage <command>\n");
        return 1;
    }

    char command[256]; 
    snprintf(command, sizeof(command), "python manage.py %s", argv[1]);

    system(command);
    return 0;
}