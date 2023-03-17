let dataContainer = [];
// fetching data
const loadAi = (cardLimit = 6) => {
    toggleSpinner(true);
    fetch('https://openapi.programming-hero.com/api/ai/tools')
        .then(res => res.json())
        .then(data => {
            toggleSpinner(false);
            showAi(data.data.tools, cardLimit)
            document.getElementById("see-more").classList.remove("hidden");
        });
};

// showing data
const showAi = (data, cardLimit) => {
    const cardContainer = document.getElementById('ai-card-container');
    cardContainer.textContent = '';
    const dataLimit = data.slice(0, cardLimit ? cardLimit : data.length);

    dataContainer = dataLimit;

    // loading card information
    dataLimit.forEach(singleCard => {

        cardContainer.innerHTML += `
        <div class="card-normal w-fit bg-base-100 shadow-xl p-2 md:p-6 rounded-lg border">
                <figure><img class="rounded-lg " src="${singleCard.image}" alt="Shoes" /></figure>
                <div class="card-body">
                    <h2 class="card-title">
                        Features
                    </h2>
                    <ol class="list-decimal">
                    <div>${singleCard?.features?.[0] ? `<li>${singleCard.features[0]}</li>` : ""}</div>
                    <div>${singleCard?.features?.[1] ? `<li>${singleCard.features[1]}</li>` : ""}</div>
                    <div>${singleCard?.features?.[2] ? `<li>${singleCard.features[2]}</li>` : ""}</div>
                    <div>${singleCard?.features?.[3] ? `<li>${singleCard.features[3]}</li>` : ""}</div>
                    </ol>
                    <hr>
                    <div class="card-actions justify-between">

                        <div>
                            <p class="text-xl font-semibold">${singleCard.name}</p>
                            <i class="fa-sharp fa-regular fa-calendar"></i>
                            <span>${singleCard.published_in}</span>
                        </div>
                        <div>
                            <label for="modal-id" onclick="loadModalDetails('${singleCard.id}')" class="btn btn-outline btn-error text-white"><i class="fa-solid fa-arrow-right"></i></label>
                        </div>
                    </div>
                </div>
            </div>
        `;
    })
}

// toggle spinner
const toggleSpinner = isLoading => {
    const spinnerSection = document.getElementById('spinner');
    if (isLoading) {
        spinnerSection.classList.remove('hidden');
    }
    else {
        spinnerSection.classList.add('hidden');
    }
}

// seemore button
const seeMore = () => {
    loadAi(0);
    const showAll = document.getElementById("btn-see-more");
    showAll.classList.add("hidden");
};


// fetching modal data
const loadModalDetails = (id) => {
    // console.log(id);
    fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
        .then(response => response.json())
        .then(data => showModal(data.data));
}


// Modal 
const showModal = (data) => {
    const modalContainer = document.getElementById('modal-container');
    // const modalButton = document.getElementById('modal-id');

    modalContainer.textContent = '';

    // console.log(data.description);
    modalContainer.innerHTML +=
        `
    <div class="card card-compact w-fit md:w-fit bg-orange-50 shadow-xl p-0">
     <div class="card-body">
        <h2 class="card-title">${data.description}</h2>
        <div class="grid grid-cols-3 md:grid-cols-3 w-full justify-between space-x-2 space-y-2  text-lg font-medium ">
            <div class="card card-compact bg-white text-green-500 p-4 ">
                 <span>${data.pricing?.[0].price ? data.pricing[0].price : "Free of Cost"}</span>
                 <span>${data.pricing?.[0].plan ? data.pricing?.[0].plan : "Basic"}</span>
            </div>
            <div class="card card-compact bg-white text-orange-500 p-4 ">
                  <span>${data.pricing?.[1].price ? data.pricing[1].price : "Free of Cost"}</span>
                  <span>${data.pricing?.[1].plan ? data.pricing?.[1].plan : "Pro"}</span>
            </div>
            <div class="card card-compact bg-white text-red-500 p-4 ">
                 <span>${data.pricing?.[2].price ? data.pricing[2].price : "Free of Cost"}</span>
                 <span>${data.pricing?.[2].plan ? data.pricing?.[1].plan : "Enterprise"}</span>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-2" >
            <div>
                <h2 class="card-title">Features</h2>
                <ol class="list-disc">
                <div>${data?.features?.[1]?.feature_name ? `<li>${data.features[1].feature_name}</li>` : ""}</div>
                <div>${data?.features?.[2]?.feature_name ? `<li>${data.features[2].feature_name}</li>` : ""}</div>
                <div>${data?.features?.[3]?.feature_name ? `<li>${data.features[3].feature_name}</li>` : ""}</div>
                <div>${data?.features?.[4]?.feature_name ? `<li>${data.features[4].feature_name}</li>` : ""}</div>
                 </ol>
                
            </div>

            <div>
                <ol class="list-disc">
                <h2 class="card-title">Integrations</h2>
                    <div> ${data.integrations === null ? "No Data Found" : ""} </div>
                    <div>${data.integrations?.[0] ? `<li>${data.integrations?.[0]}</li>` : ""}</div>
                    <div>${data.integrations?.[1] ? `<li>${data.integrations?.[1]}</li>` : ""}</div>
                    <div>${data.integrations?.[2] ? `<li>${data.integrations?.[2]}</li>` : ""}</div>
                 </ol>
            </div>
        </div> 
     </div>
    </div>

    <div class="card card-normal w-fit bg-base-100 shadow-xl p-4">
    <div id="accuracy-badge">${data.accuracy.score ? `
    <span class=" rounded w-3/12 bg-red-600 text-center text-xs font-semibold 
    p-1 text-white relative top-8 left-3/4 lg:top-8 lg:left-3/4">
    ${data.accuracy.score * 100}% accuracy</span>` : ""}</div>
        <figure><img src="${data.image_link?.[0]}" alt="Shoes" /></figure>
            <div class="card-body text-center">
                <h2 class=" text-3xl font-semibold  ">${data.input_output_examples?.[0].input ? data.input_output_examples[0].input : "Can you give any Example?"}</h2>
                <p>${data.input_output_examples?.[0].output ? data.input_output_examples[0].output : "No! Not Yet! Take a break!!!"}</p>
            </div>
     </div>
        `;
}

// sort date
const sortByDate = () => {
    sortedDate(dataContainer);
};

const sortedDate = (data) => {
    data.sort((a, b) => {
        const dateA = new Date(a.published_in);
        const dateB = new Date(b.published_in);

        if (dateA > dateB) {
            return -1;
        }
        if (dateB > dateA) {
            return 1;
        }
        return 0;
    });
    showAi(data);
}

loadAi();
// loadModalDetails();