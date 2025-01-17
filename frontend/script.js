const dropzoneBox = document.getElementsByClassName("dropzone-box")[0];
const inputFiles = document.querySelectorAll(".dropzone-area input[type='file']");
const inputElement = inputFiles[0];
const dropZoneElement = inputElement.closest(".dropzone-area");
const fileLimit = 25000000;

// Configurando tipos de arquivos aceitos
inputElement.setAttribute("accept", "image/*,.pdf,.doc,.docx");

inputElement.addEventListener("change", (e) => {
    const filesArr = Array.from(inputElement.files);
    const totalSize = filesArr.reduce((acc, file) => acc + file.size, 0);

    if (totalSize > fileLimit) {
        alert("O arquivo tem mais de 25MB!");
        return;
    }

    if (filesArr.length) {
        updateDropzoneFileList(dropZoneElement, filesArr);
    }
});

dropZoneElement.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZoneElement.classList.add("dropzone--over");
});

["dragleave", "dragend"].forEach((type) => {
    dropZoneElement.addEventListener(type, () => {
        dropZoneElement.classList.remove("dropzone--over");
    });
});

dropZoneElement.addEventListener("drop", (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    const filesArr = Array.from(files);
    const totalSize = filesArr.reduce((acc, file) => acc + file.size, 0);

    if (totalSize > fileLimit) {
        alert("O arquivo tem mais de 25MB!");
        dropZoneElement.classList.remove("dropzone--over");
        return;
    }

    if (files.length) {
        inputElement.files = files;
        updateDropzoneFileList(dropZoneElement, filesArr);
    }

    dropZoneElement.classList.remove("dropzone--over");
});

// Atualizar a lista de arquivos na dropzone
const updateDropzoneFileList = (dropZoneElement, filesArr) => {
    let dropzoneFileMessage = dropZoneElement.querySelector(".file-info");

    const filesString = filesArr
        .map((file) => `<li>${file.name}, ${file.size} bytes</li>`)
        .join("\n");

    dropzoneFileMessage.innerHTML = `<ul>${filesString}</ul>`;
};

// Resetar a dropzone
dropzoneBox.addEventListener("reset", () => {
    let dropzoneFileMessage = dropZoneElement.querySelector(".file-info");
    dropzoneFileMessage.innerHTML = `Nenhum arquivo selecionado`;
});

// Enviar arquivos para o backend
dropzoneBox.addEventListener("submit", async (e) => {
    e.preventDefault();
    const files = Array.from(inputElement.files);

    if (files.length === 0) {
        alert("Por favor, selecione um arquivo.");
        return;
    }

    const totalSize = files.reduce((acc, file) => acc + file.size, 0);
    if (totalSize > fileLimit) {
        alert("O arquivo tem mais de 25MB!");
        return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("file", file));

    try {
        const response = await fetch("http://localhost:8080/files/upload", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            const result = await response.text();
            alert("Upload realizado com sucesso! ID: " + result);
        } else {
            alert("Erro ao enviar o arquivo.");
        }
    } catch (error) {
        alert("Erro ao conectar ao servidor.");
        console.error(error);
    }
});
