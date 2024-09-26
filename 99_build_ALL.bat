@echo off

call "01_build_FRONTEND.bat" "nopause"

IF NOT [%EL%] == [000] GOTO ERRORENDE

call "02_build_BACKEND.bat" "nopause"

IF NOT [%EL%] == [000] GOTO ERRORENDE



GOTO ENDE

:ERRORENDE
pause

:ENDE
