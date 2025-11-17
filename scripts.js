let palabras = ['hola', 'casa', 'mañana', 'dia', 'tarde', 'sol', 'coche', 'sopa']
let numero_total_letras_sopa=850

const $n_letras=document.querySelector("#cantidad-letras-sopa")
$n_letras.addEventListener("change",()=>{numero_total_letras_sopa=Number($n_letras.value)})


function crear_grupo_caracteres() {
    let texto_crear = ""
    const letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    const numero_letras = letras.length - 1
    for (let i = 0; i < numero_total_letras_sopa; i++) {
        texto_crear += ' ' + letras[Math.floor(Math.random() * numero_letras)]
    }
    return texto_crear
}

function buscar_palabras(texto) {
    let texto_copia = texto
    let palabras_encontradas = []
    for (let i = 0; i < palabras.length; i++) {
        const existe = texto_copia.search(palabras[i])
        if (existe != -1) {
            texto_copia.replaceAll(palabras[i], `<font> ${palabras[i]}</font>`)
            palabras_encontradas.push(`<font>${palabras[i].replaceAll(' ', '')}</font>`)
        }
    }
    return [texto_copia, palabras_encontradas]
}

function mostrar_texto_palabras(texto_mostrar) {
    document.getElementById('texto').innerHTML = texto_mostrar[0]
    if (texto_mostrar[1].length > 0) {
        if (document.getElementById('palabras-encontradas').innerHTML == 'Sin resultados') {
            document.getElementById('palabras-encontradas').innerHTML = texto_mostrar[1] + ' || '
        }
        else {
            document.getElementById('palabras-encontradas').innerHTML += texto_mostrar[1] + ' || '
        }
    }
}

function cambiar_palabras() {
    if (ver_palabras_permitido) {
        const palabras_nuevas = document.getElementById('palabras-añadir').value.replaceAll(' ', '').toLocaleLowerCase().split(',')
        palabras = [...palabras_nuevas]
        corregir_palabras()
        document.getElementById('palabras-añadir').value=""
    }
}

function añadir_palabras() {
    if (ver_palabras_permitido) {
        const palabras_nuevas = document.getElementById('palabras-añadir').value.replaceAll(' ', '').toLocaleLowerCase().split(',')
        palabras = [...palabras, ...palabras_nuevas]
        corregir_palabras()
        document.getElementById('palabras-añadir').value=""
    }
}

function eliminar_palabras(palabra) {
    const indice = palabras.indexOf(palabra)
    if (indice != -1) {
        palabras.splice(indice, 1)
    }
    ver_palabras_permitido = ! ver_palabras_permitido
    ver_palabras()
}

function reiniciar_palabras_encontradas(){
    document.getElementById("palabras-encontradas").innerHTML="Sin resultados"
}

let ver_palabras_permitido = true
function ver_palabras() {
    if (ver_palabras_permitido) {
        document.getElementById('palabras-añadir').style.display = "none"
        let codigo = ""
        for (let i = 0; i < palabras.length; i++) {
            codigo += `<font onclick="eliminar_palabras('${palabras[i]}')">${palabras[i].replaceAll(' ', '')}</font>`
            if (!(i == palabras.length - 1)) {
                codigo += ", "
            }
        }
        document.querySelector('#palabras-buscar').style.display = "block"
        document.querySelector('#palabras-buscar').innerHTML = codigo
        document.querySelector('#bt-ver-palabras').value = "Esconder Palabras"
        document.querySelector('#palabras-añadir').style.display = "none"
    }
    else {
        document.querySelector('#palabras-buscar').style.display = "none"
        document.querySelector('#palabras-buscar').innerHTML = ""
        document.querySelector('#palabras-añadir').style.display = "block"
        document.querySelector('#bt-ver-palabras').value = "Ver Palabras"
    }
    ver_palabras_permitido = !ver_palabras_permitido
}

function corregir_palabras() {
    palabras = palabras.sort()
    //corregir palabras
    for (let i = 0; i < palabras.length; i++) {
        const palabra = palabras[i].replaceAll(' ', '')
        let palabra_copia = ""
        for (let j = 0; j < palabra.length; j++) {
            palabra_copia += ((j != 0) && (palabra[j] != ' ')) ? ' ' + palabra[j] : palabra[j]
        }
        if (palabra != palabra_copia) {
            palabras[i] = palabra_copia
        }
    }
    //eliminar palabras duplicadas

    //forma 1
    /*for (let i = 0; i < palabras.length; i++) {
        const palabra_buscar = palabras[i]
            for (let j = i+1; j < palabras.length; j++) {
                if (palabra_buscar === palabras[j]) {
                    palabras.splice(j,1)
                    j-=1
                }
                else {
                    break
                }
            }
    }*/
    //forma 2 (recomendada)
    for (let i = 0; i < palabras.length; i++) {
        if (palabras[i] === palabras[i + 1]) {
            palabras.splice(i + 1, 1)
            i -= 1
        }
    }

}

window.addEventListener('load', () => {
    setTimeout(() => {
        corregir_palabras()
        const interval = setInterval(() => {
            mostrar_texto_palabras(buscar_palabras(crear_grupo_caracteres()))
        }, 800)
    }, 450)
})