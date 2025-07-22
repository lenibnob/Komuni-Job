#include <stdio.h>
#include <windows.h>
#include <unistd.h>
#include <stdbool.h>
#include <string.h>

bool change();
bool runServerApache();
bool runServerMysql();
bool runSql();
bool runSqlUP(char *user, char *pass);
bool runSqlOnline();

int main(int argc, char *argv[]) {
    if(argc > 1) {
        if(strcmp(argv[1], "runserver") == 0) {
            if(strcmp(argv[2], "mysql") == 0) {
                if(change()) {
                    if(runServerMysql()) {
                        printf("MySQL server is running");
                    } else printf("There is an error running mysql server");
                } else printf("Error at changing directory to /xampp/mysql/bin");
            } else if(strcmp(argv[2], "apache") == 0) {
                if(runServerApache()) {
                    printf("Apache server is running");
                } else printf("There is an error running Apache");
            } else printf("Syntax error. options available <mysql> <apache>");
        } else if(strcmp(argv[1], "open") == 0) {
            if(change()) {
                if(argc > 2) {
                    if(strcmp(argv[2], "online") == 0) {
                        if(runSqlOnline()) {
                            printf("Online MySQL Running");
                        } else printf("Error at connecting to online database"); return 1;
                    } else if(argc > 4) {
                        if(runSqlUP(argv[2], argv[3])) {
                            printf("MySQL Running");
                        } else printf("Error on starting MySQL\n"); return 1;
                    } else printf("Syntax error.\ndatabase <open> <MySQL user> <MySQL password>\n"); return 1;
                } else {
                    if(runSql()) {
                        printf("MySQL Running");
                    } else printf("Error on starting MySQL\n"); return 1;
                }
            } else printf("Error on changing directory to /xampp/mysql/bin\n");
        } else printf("Syntax error. \ndatabase runserver <mysql> <apache>\ndatabase <open>\n"); return 1;
    } else printf("Syntax error. \ndatabase runserver <mysql> <apache>\ndatabase <open>\ndatabase <open> <online>\ndatabase <open> <MySQL user> <MySQL password>"); return 1;
}

bool change() {
    if (chdir("\\xampp\\mysql\\bin") == 0) return true;
    return false;
}

bool runServerMysql() {
    if(system("powershell -Command Start-process ./mysqld --console;") == 0)  {   
        return true;
    } else printf("Error on starting mysqld\n"); return false;
}

bool runServerApache() {
    if((chdir("/xampp") == 0)) {
        if(system("powershell -Command Start-process './apache_start.bat';") == 0) {
            return true;
        } else printf("Error on starting apache\n"); return false;
    } else printf("Error on changing directory back to xampp\n"); return false;
}

bool runSql() {
    if(change()) {
        if(system("mysql -u root") == 0) {
            return true;
        } else printf("Error on starting mysql\n"); return false;
    } else printf("Error on changing directory to /xampp/mysql/bin\n"); return false;
}

bool runSqlUP(char *user, char *pass) {
    if(change()) {
        char command[256];
        snprintf(command, sizeof(command), "mysql -u %s -p%s", user, pass);
        if(system(command) == 0) {
            return true;
        } else printf("Error on starting mysql\n"); return false;
    } else printf("Error on changing directory to /xampp/mysql/bin\n"); return false;
}

bool runSqlOnline() {
    if(change()) {
        if(system("mysql -h sql12.freesqldatabase.com -u sql12790789 -ppHsfGnHQN6 -P 3306 sql12790789") == 0) {
            return true;
        } else printf("Error on starting mysql\n"); return false;
    } else printf("Error on changing directory to /xampp/mysql/bin\n"); return false;
}