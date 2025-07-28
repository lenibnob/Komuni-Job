#include <stdio.h>
#include <windows.h>
#include <unistd.h>
#include <stdbool.h>
#include <string.h>

bool addChange(char *file);
bool commit(char *comment);
bool pullOrigin();
bool upload();

int main(int argc, char *argv[]) {
    if(argc > 1) {
        for(int i = 1; i < argc; i++) {
            if(strcmp(argv[i], "-a")) {
                if(addChange(argv[i+1])) {
                    printf("Change added");
                } else printf("Failed to add changes"); return 1;
            } else if(strcmp(argv[i], "-c")) {
                if(commit(argv[i+1])) {
                    printf("Commit changes successful");
                } else printf("Failed to commit changes"); return 1;
            } else if(strcmp(argv[i], "-p")) {
                if(upload()) {
                    printf("Push successful");
                } else printf("Failed to push"); return 1;
            } else {
                printf("Syntax error.\nupdate <command> <option>\n"); 
                printf("command - ['-a', '-c', '-p']\n");
                printf("option - if -a is chosen, type the name of the file that you wanted to add changes into.\n");
                printf("       - if -c is chosen, type the message for the commit.\n");
                printf("       - if -p is chosen, you don't need to type anything.\n");
                printf("usage:\nupdate -a <filename> / . (to add all changes)\n");
                printf("update -a <filename> / . (to add all changes)\n");
                printf("update -c <comment/message>\n");
                printf("update -p\n");
                printf("proper usage:\nupdate -a <filename/.> -c <comment/message> -p\n");
            }
        }
    } else printf("Syntax error.\nupdate <pull>\nupdate <push> <comment>"); return 1;
}

bool pullOrigin() {
    if(system("git fetch origin") == 0) {
        if(system("git merge origin/main")) {
            return true;
        }
    }
    return false;
}

bool addChange(char *file) {
    char command[256];
    snprintf(command, 256, "git add \"%s\"", file);
    if(system(command) == 0) {
        return true;
    } else return false;
}

bool upload() {
    if(system("git push origin main") == 0) {
        return true;
    } else return false;
}

bool commit(char *comment) {
    char command[256];
    snprintf(command, 256, "git commit -m \"%s\"", comment);
    if(system(command) == 0) {
        return true;
    } else return false;
}