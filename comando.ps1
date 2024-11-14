# Lista dos diretórios que precisam rodar o comando 'yarn'
$directories = @("intro", "nav_bar", "raw_clients", "root", "selected_clients")

Write-Output "Iniciando instalação das dependências..."

# Primeiro Passo: Instala todas as dependências em cada diretório
foreach ($dir in $directories) {
    if (Test-Path -Path $dir) {
        Write-Output "Instalando dependências em $dir..."
        Set-Location -Path $dir
        yarn | Out-Null  # Redireciona a saída para evitar muito texto na tela
        if ($LASTEXITCODE -ne 0) {
            Write-Output "Erro ao instalar dependências em $dir. Encerrando."
            exit
        }
        Set-Location -Path ..
    } else {
        Write-Output "Diretório $dir não encontrado. Pulando..."
    }
}

Write-Output "Todas as dependências instaladas."

# Segundo Passo: Inicia cada projeto sequencialmente
foreach ($dir in $directories) {
    if (Test-Path -Path $dir) {
        Write-Output "Iniciando servidor em $dir..."
        Set-Location -Path $dir
        Start-Process -NoNewWindow -Wait -FilePath "yarn" -ArgumentList "start"
        if ($LASTEXITCODE -ne 0) {
            Write-Output "Erro ao iniciar o servidor em $dir. Encerrando."
            exit
        }
        Set-Location -Path ..
    } else {
        Write-Output "Diretório $dir não encontrado. Pulando..."
    }
}

# Terceiro Passo: Abre o navegador padrão no localhost:1234
Write-Output "Abrindo o projeto no navegador padrão..."
Start-Process "http://localhost:1234"

Write-Output "Todos os projetos foram iniciados e o navegador foi aberto."
