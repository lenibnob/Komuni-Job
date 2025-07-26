#include <stdio.h>
#include <windows.h>
#include <unistd.h>
#include <stdbool.h>
#include <string.h>

bool addChange();
bool commit(char *comment);
bool pullOrigin();
bool upload();

int main(int argc, char *argv[]) {
    if(argc > 1) {
        if((strcmp(argv[1], "pull")) == 0) {
            if(pullOrigin()) {
                printf("Local repository updated");
            } else printf("No need for further update"); return 1;
        } 
        else if((strcmp(argv[1], "push")) == 0) {
            if(addChange()) {
                if(argc > 2) {
                    if(commit(argv[2])) {
                        if(upload()) {
                            printf("Uploaded to git repository");
                        } else printf("There is an error uploading to the git repository"); return 1;
                    } else printf("There is an error committing changes"); return 1;
                } else printf("Syntax error.\nupdate <pull>\nupdate <push> <comment>");
            } else printf("There is an error adding changes"); return 1;
        } else printf("Syntax error.\nupdate <pull>\nupdate <push> <comment>"); return 1; 
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

bool addChange() {
    if(system("git add .") == 0) {
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