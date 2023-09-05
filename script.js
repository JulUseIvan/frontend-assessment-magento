document.addEventListener("DOMContentLoaded", function () {
    function createTabs(data) {
        const buttonsContainer = document.querySelector('.buttons-container'); 
        const contentContainer = document.querySelector('.content-container'); 

        data.forEach((section, index) => {
            const sectionDiv = document.createElement('div');
            sectionDiv.classList.add('section');

            const sectionTitle = document.createElement('h2');
            sectionTitle.textContent = section.title;

            const sectionContent = document.createElement('div');
            sectionContent.innerHTML = section.content;

            sectionDiv.appendChild(sectionTitle);
            sectionDiv.appendChild(sectionContent);

            const tabButton = document.createElement('button');
            tabButton.textContent = section.title;
            tabButton.addEventListener('click', () => {
                data.forEach((_, i) => {
                    const otherSection = contentContainer.children[i];
                    if (i === index) {
                        sectionDiv.classList.add('active');
                        tabButton.classList.add('active');
                    } else {
                        otherSection.classList.remove('active');
                        buttonsContainer.children[i].classList.remove('active');
                    }
                });
            });

            buttonsContainer.appendChild(tabButton);
            contentContainer.appendChild(sectionDiv);

            if (index === 0) {
                sectionDiv.classList.add('active');
                tabButton.classList.add('active');
            }
        });
    }

    function createAccordion(data) {
        const accordionContainer = document.querySelector('.accordion');

        data.forEach((section, index) => {
            const sectionDiv = document.createElement('div');
            sectionDiv.classList.add('section');

            const sectionTitle = document.createElement('h2');
            sectionTitle.textContent = section.title;

            const sectionContent = document.createElement('div');
            sectionContent.innerHTML = section.content;

            sectionDiv.appendChild(sectionTitle);
            sectionDiv.appendChild(sectionContent);

            const accordionItem = document.createElement('div');
            accordionItem.classList.add('accordion-item');
            const accordionButton = document.createElement('button');
            accordionButton.textContent = section.title;

            accordionButton.setAttribute('data-section-index', index);

            accordionButton.addEventListener('click', () => {
                const currentIndex = parseInt(accordionButton.getAttribute('data-section-index'));

                const currentAccordionItem = accordionContainer.children[currentIndex];
                currentAccordionItem.classList.toggle('active');
            });

            accordionItem.appendChild(accordionButton);
            accordionItem.appendChild(sectionContent.cloneNode(true));

            accordionContainer.appendChild(accordionItem);

            if (index === 0) {
                sectionDiv.classList.add('active');
                accordionItem.classList.add('active');
            }
        });
    }

    function checkScreenWidth() {
        const screenWidth = window.innerWidth;
        if (screenWidth < 768) {
            createAccordion(data);
        } else {
            createTabs(data);
        }
    }

    let data; 

    fetch('data.json')
        .then(response => response.json())
        .then(dataResponse => {
            data = dataResponse;
            checkScreenWidth(); 
        })
        .catch(error => console.error('Error fetching data:', error));

    window.addEventListener('resize', checkScreenWidth);
});
