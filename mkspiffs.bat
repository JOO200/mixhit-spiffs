mkspiffs.exe -c spiffs -b 4096 -p 256 -s 0x60000 spiffs.bin
::mkspiffs.exe -c spiffs -b 4096 -p 256 -s 0x16F000 spiffs.bin
pause
C:\msys32\mingw32\bin\python.exe C:/msys32/home/HIT/esp/esp-idf/components/esptool_py/esptool/esptool.py --chip esp32 --port COM3 --baud 115200 write_flash -z 0x210000 spiffs.bin
pause