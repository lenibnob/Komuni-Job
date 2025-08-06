#include <stdio.h>
#include <windows.h>
#include <unistd.h>
#include <stdbool.h>

bool run();

int main() {
    run();
}

bool run() {
    if(system("npm run dev") == 0) {
        return true;
    } else return false;
}