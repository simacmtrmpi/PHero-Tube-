// category function
const handleCategory = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const json = await res.json()
    const data = json.data;

    const tabContainer = document.getElementById('tab-container');

    data.forEach(category => {
        const div = document.createElement('div');
        div.innerHTML = `
            <a onclick="handleCard(${category.category_id})" class="tab bg-[#25252526] rounded-md">${category.category}</a>
        `
        tabContainer.appendChild(div)
    });
}

let sortCategory = false;
// console.log(sortCategory);

// Function to sort items by view count
function sortByViewCount() {
    sortCategory = true;
    // console.log(sortCategory);
    handleCard()
    // console.log('data');
    

}
// Add a click event listener to the button
const sortButton = document.getElementById("sort-button");
sortButton.addEventListener("click", sortByViewCount);

// console.log(sortCategory);
// card function
const handleCard = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const json = await res.json()
    const data = json.data;
    let cards = [...data]; 
    console.log(cards);
    
    if(sortCategory){
        // console.log('sfjhgaigh');
        // console.log(cards);
        cards = cards.sort((a, b ) => {console.log(b);parseFloat(b.others.views.slice(0,-1)) - parseFloat(a.others.views.slice(0,-1))});
        // console.log(cards, a,b);

    }else{
    }

    const cardContainer = document.getElementById('card-container');
    cardContainer.innerText = '';

    if (cards.length === 0) {
        const div = document.createElement('div');
        cardContainer.classList.remove('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'xl:grid-cols-4', 'gap-8', 'mb-8');
        div.classList = 'flex justify-center items-center  w-full my-24 md:my-56';
        div.innerHTML = `
            <div class="flex flex-col justify-center items-center text-center">
             <img src=${'image/Icon.png'} alt="">
             <h3 class="text-xl md:text-4xl font-bold md:w-[400px] mt-8">Oops!! Sorry, There is no content here</h3>
            </div>
        `
        cardContainer.appendChild(div);
    } else {
        cards.forEach((cardInfo) => {
            cardContainer.classList.add('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'xl:grid-cols-4', 'gap-8', 'mb-8');

            const div = document.createElement('div');
            div.classList = 'card bg-base-100';
            div.innerHTML = `
            <figure>
                <img class="w-full h-[200px] rounded-b-xl" src="${cardInfo.thumbnail}" alt="" />
            </figure>
            <div class="flex items-start gap-4 mt-5 relative">
                <div>
                    <img class="w-[40px] h-[40px] rounded-full" src="${cardInfo.authors[0].profile_picture}" alt="">
                </div>
                <div class="w-64">
                    <h2 class="text-lg font-bold">${cardInfo.title}</h2>
                    <div class="flex gap-2 items-center mt-3">
                        <p class="font-medium">${cardInfo.authors[0].profile_name}</p>
                        ${cardInfo.authors[0].verified === true ? `<img src=${'image/fi_10629607.svg'}>` : ''}
                    </div>
                    <p>${cardInfo?.others.views} views</p>
                </div>
                <div class="absolute right-4 -top-16">
                ${convertSecondsToHoursAndMinutes(cardInfo.others.posted_date) !== '0 hrs 0 min ago' ? 
                `<p class="bg-[#171717] text-white px-2 py-1  rounded-md">${convertSecondsToHoursAndMinutes(cardInfo.others.posted_date)}</p>` : ''}
                </div>
            </div>
            `

            cardContainer.appendChild(div);
        })
    }

}



// hour minute function
function convertSecondsToHoursAndMinutes(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours} hrs ${minutes} min ago`;
}

handleCard(1000)
handleCategory()