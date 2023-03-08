const baseUrl = "https://api.escuelajs.co/api/v1/";
document.getElementById("header").innerHTML = generateHeaderComponent();
document.getElementById("footer").innerHTML = generateFooterComponent();



function toggleMenu() {

    const menu = document.getElementById('mobile-menu');

    document.getElementById("openMenu").addEventListener('click', () => {

        const menu = document.getElementById('mobile-menu');
        if (menu.classList.contains('hidden')) {
            menu.classList.remove('hidden');
            menu.classList.add('show');
        }
    });

    document.getElementById("menu-close").addEventListener('click', () => {

        if (menu.classList.contains('show')) {
            menu.classList.remove('show');
            menu.classList.add('hidden')
        }
    });
}
toggleMenu();





// PRODUCTS COMPONENTS


async function generateProducts(eltId, quantiy = 20, title) {
    const element = document.getElementById(eltId);
    const data = await fetchApi("products", quantiy);
    const products = data.slice(0, quantiy);

    const generateProductContainer = () => {
        return `
        ${title || ''}
        <div class="grid grid-cols-1 gap-y-10 gap-x-6 
            sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"> 
            ${products.map(product => generateProductCard(product)).join('')}
        </div>
        `
    }

    element.innerHTML = generateProductContainer();
}

function generateTitle(title) {
    return `<h1 class="text-4xl my-8 font-semibold tracking-tight w-full text-left text-gray-900">${title}</h1>`
}

const handleClickProduct = (id) => {

    fetProductById(id).then(product => {
        const children = singleProduct(product);
        openModal(children);
    });
}

function generateProductCard(product) {

    return `

        <div onclick={handleClickProduct(${product.id})} class="group cursor-pointer">
            <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                <img src=${product.images[0]} alt=${product.title} class="h-full w-full rounded object-cover object-center group-hover:opacity-75">
            </div>
            <h3 class="mt-4 text-sm text-gray-700">${product.title}</h3>
            <p class="mt-1 text-lg font-medium text-gray-900">$${product.price}</p>
        </div>
    `;
}








// CATEGORIES COMPONENTS

async function generateCategoryCard() {

    const categories = await fetchApi("categories", 4);


    const generateCategoryContainer = () => {

        let data = ''

        categories && categories.forEach(category => {
            data += `
                <div class="group relative" id=${category.id}>
                    <div
                        class="aspect-w-1 aspect-h-1 w-full 
                        overflow-hidden rounded-lg bg-gray-200 
                        xl:aspect-w-7 xl:aspect-h-8">

                        <img src=${category.image}
                            alt=${category.name}
                            class="h-full w-full object-cover object-center">
                    </div>

                    <p class="text-base font-semibold 
                    text-gray-900">${category.name}</p>
                </div>
            `
        })

        return data;
    }


    return generateCategoryContainer();
}


function sectionContent(flexDirection, callback) {

    return `
    <div class="my-12">
        <div class="flex products gap-8 ${flexDirection}">
            ${callback}
        </div>
    </div>
    `;
}



function generateElement(tag, className = '', text = '') {
    const element = document.createElement(tag);
    element.className = className;
    element.innerText = text;
    return element;
}












// FETCHING DATA


async function fetchApi(key = "products", quantiy = 21) {

    const response = await fetch(baseUrl + key);
    const data = await response.json();
    let items = data.slice(1, 21);
    localStorage.setItem(key, JSON.stringify(items));
    return items.slice(0, quantiy);

}


const fetProductById = async (id) => {
    const response = await fetch(`${baseUrl}products/${id}`);
    const data = await response.json();
    return data;
}
























function generateHeaderComponent() {
    
    const baseLink= window.location.pathname.split("/templates")[0];

    const navLinks = [
        {
            name: 'Home',
            link: baseLink,
        },
        {
            name: 'Shop',
            link: 'templates/shop.html'
        },
        {
            name: 'Collections',
            link: 'templates/categories.html'
        }, {
            name: 'About us',
            link: 'templates/about.html'
        },
        {
            name: 'Contact us',
            link: 'templates/contact.html'
        },
        {
            name: '',
            link: ''
        }
    ]


    const getCurrentPath = (link = '') => {


        const path = window.location.pathname;
        if (path === '/') return link;
        if (path.includes("templates/")) return link.replace("templates/", "");
        return link;
    }

    const generateLinks = () => {
        return navLinks.map(link => {
            return `<a href="${getCurrentPath(link.link)}" onclick="${getCurrentPath()}" class=" font-semibold uppercase hover:text-amber-400 delay-200 transition-all leading-6 text-gray-900">${link.name}</a>`
        }).join('')
    }




    return `
    <div class="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
            
        </div>
        <div class="px-6 py-6 lg:px-8">
            <nav class="flex items-center justify-between" aria-label="Global">
                <div class="flex lg:flex-1">
                    <a href="/" class="-m-1.5 p-1.5">
                        <span class="sr-only">Stop & Shop</span>
                        <img class="h-12"
                            src="https://logos-download.com/wp-content/uploads/2016/05/Stop__Shop_logo_logotype.png"
                            alt="">
                    </a>
                </div>
                <div class="flex lg:hidden" id="openMenu">
                    <button type="button"
                        class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
                        <span class="sr-only">Open main menu</span>
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                            aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>
                <div class="hidden lg:flex lg:gap-x-12">

                    ${generateLinks()}
                    
                </div>
                <div class="hidden lg:flex lg:flex-1 lg:justify-end">
                    <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Log in <span
                            aria-hidden="true">&rarr;</span></a>
                </div>
            </nav>


            <!-- Mobile menu, show/hide based on menu open state. -->
            <div role="dialog" aria-modal="true">
                <div id="mobile-menu" focus="true" 
                    class="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 hidden mobileMenu">
                    <div class="flex items-center justify-between">
                        <a href="#" class="-m-1.5 p-1.5">
                            <span class="sr-only">Demo - Home</span>
                            <img class="h-14"
                                src="https://logos-download.com/wp-content/uploads/2016/05/Stop__Shop_logo_logotype.png"
                                alt="">
                        </a>
                        <button onclick="toggleMenu()" id="menu-close" type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700">
                            <span class="sr-only">Close menu</span>
                            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div class="mt-6 flow-root">
                        <div class="-my-6 divide-y divide-gray-500/10">
                            <div class="flex flex-col pl-4 space-y-6 py-8">

                            ${generateLinks()}
                
                            </div>
                            <div class="py-6 ">
                                <a href="#login"
                                    class="mx-3 block  w-[6rem] text-center py-2.5 px-3 text-base uppercase bg-amber-500 hover:bg-red-500 font-semibold leading-6">Log
                                    in</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <section>
            <div class="relative px-6 lg:px-8 bg-cover bg-center" style="background-image: url(https://images.unsplash.com/photo-1611855363188-b25d9f25781e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2365&q=80)">
                <div class="sm:mx-14 mx-8 max-w-2xl py-32 sm:py-48 lg:py-56">
                    <div class="text-left">
                        <h1 class="text-4xl font-bold tracking-tight capitalize text-amber-400 sm:text-6xl">Data to enrich your
                            online business</h1>
                        <p class="mt-6 text-lg leading-8 text-gray-300">Anim aute id magna aliqua ad ad non deserunt
                            sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat
                            aliqua.</p>
                        <div class="mt-10 flex items-center justify-start gap-x-6">
                            <a href="templates/shop.html"
                                class=" bg-amber-400 uppercase px-3.5 py-1.5 text-base font-semibold leading-7 text-slate-900 shadow-sm hover:bg-red-500 hover:text-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Shop Now</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
}





function generateFooterComponent() {
    const links = [
        { name: 'Shop', href: '/templates/shop.html' },
        { name: 'About', href: '/templates/about.html' },
        { name: 'Privacy', href: '#' },
        { name: 'Terms', href: '#' },
        { name: 'Account', href: '#' },
        { name: 'Store Locations', href: '/templates/contact.html' },
    ]

    return `
    <footer class="bg-gray-900">
    <div class="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav class="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
            
            ${links.map(link => {
        return `
                        <div class="px-5 py-2">
                            <a href="${link.href}" class="text-base text-gray-500 hover:text-amber-400 delay-200 transition-all">
                                ${link.name}
                            </a>
                        </div>
                    `;
    }).join('')
        }
            
        
        </nav>
        <p class="mt-8 text-center text-base text-gray-400">
            &copy; 2021 Stop & Shop. All rights reserved.
        </p>
    </div>    `;
}






// modal

function modalBody(children) {
    return `
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
    ${children}
    </div>
    `;
}


function closeModal() {
    document.getElementById("modal").innerHTML = "";
}


function openModal(component) {
    const modal = document.getElementById('modal');
    modal.innerHTML = modalBody(component);
    document.body.appendChild(modal);
}

























const singleProduct = (product) => {
    return `
    <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <div
                class="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                <div
                    class="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                    <button type="button" onclick={closeModal()} id="close-modal"
                        class="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8">
                        <span class="sr-only">Close</span>
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div class="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">
                        <div
                            class="aspect-w-2 aspect-h-3 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                            <img src=${product.images[0]}
                                alt=${product.title}
                                class="object-cover object-center">
                        </div>
                        <div class="sm:col-span-8 lg:col-span-7">
                            <h2 class="text-2xl font-bold text-gray-900 sm:pr-12">${product.title}</h2>

                            <section aria-labelledby="information-heading" class="mt-2">
                                <h3 id="information-heading" class="sr-only">Product information</h3>

                                <p class="text-2xl text-gray-900">${product.price}</p>
                                <div class="mt-6">
                                    <h4 class="sr-only">Reviews</h4>
                                    <div class="flex items-center">
                                        <div class="flex items-center">
                                            <svg class="text-gray-900 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20"
                                                fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd"
                                                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                                    clip-rule="evenodd" />
                                            </svg>

                                            <svg class="text-gray-900 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20"
                                                fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd"
                                                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                                    clip-rule="evenodd" />
                                            </svg>

                                            <svg class="text-gray-900 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20"
                                                fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd"
                                                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                                    clip-rule="evenodd" />
                                            </svg>

                                            <svg class="text-gray-900 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20"
                                                fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd"
                                                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                                    clip-rule="evenodd" />
                                            </svg>

                                            <svg class="text-gray-200 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20"
                                                fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd"
                                                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                        <p class="sr-only">3.9 out of 5 stars</p>
                                        <a href="#"
                                            class="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">117
                                            reviews</a>
                                    </div>
                                </div>
                            </section>

                            <section aria-labelledby="options-heading" class="mt-10">
                                <h3 id="options-heading" class="sr-only">Product options</h3>

                                <form>
                                    <!-- Colors -->
                                    <div>
                                        <h4 class="text-sm font-medium text-gray-900">Color</h4>

                                        <fieldset class="mt-4">
                                            <legend class="sr-only">Choose a color</legend>
                                            <span class="flex items-center space-x-3">
                                                <label
                                                    class="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-400">
                                                    <input type="radio" name="color-choice" value="White"
                                                        class="sr-only" aria-labelledby="color-choice-0-label">
                                                    <span id="color-choice-0-label" class="sr-only"> White </span>
                                                    <span aria-hidden="true"
                                                        class="h-8 w-8 bg-white rounded-full border border-black border-opacity-10"></span>
                                                </label>
                                                <label
                                                    class="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-400">
                                                    <input type="radio" name="color-choice" value="Gray"
                                                        class="sr-only" aria-labelledby="color-choice-1-label">
                                                    <span id="color-choice-1-label" class="sr-only"> Gray </span>
                                                    <span aria-hidden="true"
                                                        class="h-8 w-8 bg-gray-200 rounded-full border border-black border-opacity-10"></span>
                                                </label>
                                                <label
                                                    class="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-900">
                                                    <input type="radio" name="color-choice" value="Black"
                                                        class="sr-only" aria-labelledby="color-choice-2-label">
                                                    <span id="color-choice-2-label" class="sr-only"> Black </span>
                                                    <span aria-hidden="true"
                                                        class="h-8 w-8 bg-gray-900 rounded-full border border-black border-opacity-10"></span>
                                                </label>
                                            </span>
                                        </fieldset>
                                    </div>

                                    <!-- Sizes -->
                                    <div class="mt-10">
                                        <div class="flex items-center justify-between">
                                            <h4 class="text-sm font-medium text-gray-900">Size</h4>
                                            <a href="#"
                                                class="text-sm font-medium text-indigo-600 hover:text-indigo-500">Size
                                                guide</a>
                                        </div>

                                        <fieldset class="mt-4">
                                            <legend class="sr-only">Choose a size</legend>
                                            <div class="grid grid-cols-4 gap-4">
                                                <!-- Active: "ring-2 ring-indigo-500" -->
                                                <label
                                                    class="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 cursor-pointer bg-white text-gray-900 shadow-sm">
                                                    <input type="radio" name="size-choice" value="XXS"
                                                        class="sr-only" aria-labelledby="size-choice-0-label">
                                                    <span id="size-choice-0-label">XXS</span>
                                                    <span class="pointer-events-none absolute -inset-px rounded-md"
                                                        aria-hidden="true"></span>
                                                </label>
                                                <label
                                                    class="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 cursor-pointer bg-white text-gray-900 shadow-sm">
                                                    <input type="radio" name="size-choice" value="XS"
                                                        class="sr-only" aria-labelledby="size-choice-1-label">
                                                    <span id="size-choice-1-label">XS</span>
                                                    <span class="pointer-events-none absolute -inset-px rounded-md"
                                                        aria-hidden="true"></span>
                                                </label>
                                                <label
                                                    class="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 cursor-pointer bg-white text-gray-900 shadow-sm">
                                                    <input type="radio" name="size-choice" value="S" class="sr-only"
                                                        aria-labelledby="size-choice-2-label">
                                                    <span id="size-choice-2-label">S</span>
                                                    <span class="pointer-events-none absolute -inset-px rounded-md"
                                                        aria-hidden="true"></span>
                                                </label>

                                                <!-- Active: "ring-2 ring-indigo-500" -->
                                                <label
                                                    class="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 cursor-pointer bg-white text-gray-900 shadow-sm">
                                                    <input type="radio" name="size-choice" value="M" class="sr-only"
                                                        aria-labelledby="size-choice-3-label">
                                                    <span id="size-choice-3-label">M</span>
                                                    <span class="pointer-events-none absolute -inset-px rounded-md"
                                                        aria-hidden="true"></span>
                                                </label>

                                                <!-- Active: "ring-2 ring-indigo-500" -->
                                                <label
                                                    class="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 cursor-pointer bg-white text-gray-900 shadow-sm">
                                                    <input type="radio" name="size-choice" value="L" class="sr-only"
                                                        aria-labelledby="size-choice-4-label">
                                                    <span id="size-choice-4-label">L</span>
                                                    <span class="pointer-events-none absolute -inset-px rounded-md"
                                                        aria-hidden="true"></span>
                                                </label>

                                                <!-- Active: "ring-2 ring-indigo-500" -->
                                                <label
                                                    class="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 cursor-pointer bg-white text-gray-900 shadow-sm">
                                                    <input type="radio" name="size-choice" value="XL"
                                                        class="sr-only" aria-labelledby="size-choice-5-label">
                                                    <span id="size-choice-5-label">XL</span>
                                                    <span class="pointer-events-none absolute -inset-px rounded-md"
                                                        aria-hidden="true"></span>
                                                </label>

                                                <!-- Active: "ring-2 ring-indigo-500" -->
                                                <label
                                                    class="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 cursor-pointer bg-white text-gray-900 shadow-sm">
                                                    <input type="radio" name="size-choice" value="XXL"
                                                        class="sr-only" aria-labelledby="size-choice-6-label">
                                                    <span id="size-choice-6-label">XXL</span>
                                                    <span class="pointer-events-none absolute -inset-px rounded-md"
                                                        aria-hidden="true"></span>
                                                </label>

                                                <!-- Active: "ring-2 ring-indigo-500" -->
                                                <label
                                                    class="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 cursor-not-allowed bg-gray-50 text-gray-200">
                                                    <input type="radio" name="size-choice" value="XXXL" disabled
                                                        class="sr-only" aria-labelledby="size-choice-7-label">
                                                    <span id="size-choice-7-label">XXXL</span>

                                                    <span aria-hidden="true"
                                                        class="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200">
                                                        <svg class="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                            viewBox="0 0 100 100" preserveAspectRatio="none"
                                                            stroke="currentColor">
                                                            <line x1="0" y1="100" x2="100" y2="0"
                                                                vector-effect="non-scaling-stroke" />
                                                        </svg>
                                                    </span>
                                                </label>
                                            </div>
                                        </fieldset>
                                    </div>

                                    <button type="submit"
                                        class="mt-6 flex w-full items-center justify-center 
                                        rounded-md border border-transparent bg-amber-500 py-3 px-8 text-base 
                                        font-medium text-white hover:bg-amber-600 focus:outline-none 
                                        focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Add
                                        to bag</button>
                                </form>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
}