@echo off

REM Lista dos diretórios que precisam rodar o comando 'yarn'
set directories=("clients" "nav" "root" "selected_clients" "welcome")

REM Loop através de cada diretório
for %%d in %directories% do (
    echo Installing dependencies in %%d...
    cd %%d
    yarn
    echo Starting the project in %%d...
    yarn start
    cd ..
)

REM Mensagem ao término do script
echo All dependencies installed and all projects started.


*REM Tenta abrir o navegador padrão no localhost:8080
*echo Trying to open in the default browser...
*start explorer http://localhost:8080

*REM Adiciona um pequeno atraso para dar tempo do comando acima funcionar
*timeout /t 2 >nul

*REM Verifica se a página foi aberta no navegador padrão
*REM Tenta abrir no Chrome, Edge, ou Firefox, caso o comando acima não funcione
*echo If the default browser didn't open, trying specific browsers...

*REM Usa o comando 'rundll32' para abrir a URL no navegador padrão do sistema
*echo Opening project in the default browser...
*rundll32 url.dll,FileProtocolHandler "http://localhost:8080"
