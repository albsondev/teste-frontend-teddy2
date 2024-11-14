@echo off

REM Lista dos diretórios que precisam rodar o comando 'yarn'
set directories=("intro" "nav_bar" "raw_clients" "root" "selected_clients")

REM Adiciona um título à janela para ajudar na depuração
title Executing Yarn Commands

echo Starting dependency installation...

REM Primeiro Passo: Instala todas as dependências em cada diretório
for %%d in %directories% do (
    echo Checking if directory %%d exists...
    if exist %%d (
        echo Installing dependencies in %%d...
        cd %%d
        yarn
        if %errorlevel% neq 0 (
            echo Error installing dependencies in %%d. Exiting.
            pause
            exit /b
        )
        cd ..
    ) else (
        echo Directory %%d does not exist. Skipping...
    )
)

echo All dependencies installed.

REM Segundo Passo: Inicia cada projeto um por vez
for %%d in %directories% do (
    echo Checking if directory %%d exists...
    if exist %%d (
        echo Starting server in %%d...
        cd %%d
        yarn start
        if %errorlevel% neq 0 (
            echo Error starting server in %%d. Exiting.
            pause
            exit /b
        )
        cd ..
        REM Pausa para garantir que o projeto inicie antes de passar ao próximo
        timeout /t 10 >nul
    ) else (
        echo Directory %%d does not exist. Skipping...
    )
)

REM Terceiro Passo: Abre o navegador no localhost:9000 após todos os projetos serem iniciados
echo Opening project in the default browser...
rundll32 url.dll,FileProtocolHandler "http://localhost:9000"

echo All projects have been started and the browser has been opened.

REM Manter a janela do terminal aberta após execução
pause
