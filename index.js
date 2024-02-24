const scrollImages = document.querySelectorAll(".scroll-image");

window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;

    scrollImages.forEach(image => {
        const translateY = scrolled * -1;
        image.style.transform = ` translateY(${translateY}px) rotate(-15deg)`;
    });
});


// var cssLogoVariavel = getComputedStyle(document.body).getPropertyValue("--logo").slice(1, -1);
// console.log(cssLogoVariavel)
// const logo = document.querySelectorAll('#imgFundo')
// document.getElementById("imgFundo").src = cssLogoVariavel;

const logo = document.querySelector('#imgFundo')



const html = document.querySelector('html')
const lamp = document.querySelector('#dm')


const missao = document.getElementById('missao')
const visao = document.getElementById('visao')
const valores = document.getElementById('valores')
const mvv = document.getElementById('mvv')

var missaotxt = '<p id=missaotxt>Nossa missão é proporcionar a todos os alunos e aprendizes uma educação acessível e de alta qualidade. Isso inclui o fornecimento de recursos educacionais, ferramentas interativas e suporte personalizado para ajudar os alunos a atingirem seu potencial máximo. A missão também se concentra em promover a igualdade de oportunidades educacionais, capacitando os alunos a alcançar o sucesso acadêmico e profissional, independentemente de onde estejam localizados ou de seus antecedentes.</p>';
var visaotxt = '<p id=visaotxt>A visão de uma plataforma acadêmica de estudos é criar um mundo em que a educação seja verdadeiramente global, personalizada e eficaz. Isso envolve o desenvolvimento contínuo de tecnologias inovadoras e métodos de ensino que se adaptem às necessidades individuais dos alunos. A visão busca inspirar a curiosidade, o pensamento crítico e a busca pelo conhecimento, capacitando os alunos a se tornarem cidadãos do mundo bem-informados, criativos e resilientes.</p>';
var valorestxt = '<p id=valorestxt>Nossos valores incluem a busca constante pela excelência educacional, o compromisso com a acessibilidade, a ênfase na inovação, a promoção da diversidade e inclusão, a responsabilidade social e o apoio ao desenvolvimento pessoal e profissional dos alunos. Esses valores moldam a cultura da plataforma e garantem que ela cumpra sua missão de oferecer educação de qualidade, acessível e enriquecedora, capacitando os alunos a prosperarem em seu percurso educacional e profissional.<p>'
var mvvtxt = '';

missao.addEventListener('click', function() {
    document.getElementById('mvv').innerHTML = missaotxt;
    console.log("TESTE");
});

visao.addEventListener('click', function() {
    document.getElementById('mvv').innerHTML = visaotxt;
    console.log("TESTE");
});

valores.addEventListener('click', function() {
    document.getElementById('mvv').innerHTML = valorestxt;
    console.log("TESTE");
});