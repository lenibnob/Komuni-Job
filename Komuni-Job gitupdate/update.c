#include <stdio.h>
#include <windows.h>
#include <unistd.h>
#include <stdbool.h>

bool addChange();
bool commit();
// bool pullOrigin();
bool upload();

int main() {
    if(addChange()) {
        printf("Failed to change directory");
        return 1;
    }
    else {
        if(commit()) {
            printf("Commit changes failed");
            return 1;
        }
        else {
            if(upload()) {
                printf("Updating failed");
                return 1;
            }
            else printf("Program updated");
        }
    }
}

// bool pullOrigin() {
//     if(system("git pull origin main")) {
//         return true;
//     }
//     else return false;
// }

bool addChange() {
    if(system("git add .")) {
        return true;
    }
    else return false;
}

bool upload() {
    if(system("git push origin main --force")) {
        return true;
    }
    else return false;
}

bool commit() {
    if(system("git commit -m \"Basic File Structure\"")) {
        return true;
    }
    else return false;
}

