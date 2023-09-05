document.addEventListener("DOMContentLoaded", function () {
    // Function to create tabs for desktop view
    function createTabs(data) {
        const buttonsContainer = document.querySelector('.buttons-container'); // Container for tab buttons
        const contentContainer = document.querySelector('.content-container'); // Container for tab content

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
                // Show the corresponding section content and hide others
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

            buttonsContainer.appendChild(tabButton); // Add the button to the container
            contentContainer.appendChild(sectionDiv);

            if (index === 0) {
                sectionDiv.classList.add('active');
                tabButton.classList.add('active');
            }
        });
    }

    // Function to create accordion for mobile view
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

            // Use a data attribute to store the index of the section
            accordionButton.setAttribute('data-section-index', index);

            accordionButton.addEventListener('click', () => {
                const currentIndex = parseInt(accordionButton.getAttribute('data-section-index'));

                // Toggle the accordion item for the clicked button
                const currentAccordionItem = accordionContainer.children[currentIndex];
                currentAccordionItem.classList.toggle('active');
            });

            accordionItem.appendChild(accordionButton);
            accordionItem.appendChild(sectionContent.cloneNode(true)); // Clone content for accordion

            accordionContainer.appendChild(accordionItem);

            if (index === 0) {
                sectionDiv.classList.add('active');
                accordionItem.classList.add('active');
            }
        });
    }

    // Check the screen width on resize
    function checkScreenWidth() {
        const screenWidth = window.innerWidth;
        if (screenWidth < 768) {
            // For mobile view (less than 768px width)
            createAccordion(data);
        } else {
            // For desktop view
            createTabs(data);
        }
    }

    let data; // Store data globally

    fetch('data.json')
        .then(response => response.json())
        .then(dataResponse => {
            data = dataResponse; // Store data globally
            checkScreenWidth(); // Call the function initially
        })
        .catch(error => console.error('Error fetching data:', error));

    // Add event listener for window resize
    window.addEventListener('resize', checkScreenWidth);
});
