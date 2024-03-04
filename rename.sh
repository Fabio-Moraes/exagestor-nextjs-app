#!/bin/bash

# Função para renomear pastas recursivamente
rename_folders_recursive() {
    local start_dir="$1"
    local from_name="$2"
    local to_name="$3"

    # Percorre recursivamente todas as pastas no diretório atual
    find "$start_dir" -depth -type d -name "$from_name" -print0 | while IFS= read -r -d '' folder; do
        # Remove o caminho relativo do nome da pasta
        local relative_folder="${folder#$start_dir}"

        # Novo nome da pasta com o caractere adicionado
        local new_folder="${folder%$from_name}$to_name"

        # Renomeia a pasta
        mv "$folder" "$new_folder"
        echo "Pasta $relative_folder renomeada para ${relative_folder%$from_name}$to_name"

        # Renomeia subpastas recursivamente
        rename_folders_recursive "$new_folder" "$from_name" "$to_name"
    done
}

# Diretório raiz do projeto
root_directory="./src"

# Nome da pasta a ser renomeada
from_folder="components"

# Novo nome da pasta
to_folder="_components"

# Renomeia as pastas recursivamente
rename_folders_recursive "$root_directory" "$from_folder" "$to_folder"
