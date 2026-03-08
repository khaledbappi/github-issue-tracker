const userId = document.getElementById("user-id");
const userPassword = document.getElementById("user-password");
const signIn = document.getElementById("sign-in");
const issueTracker = document.getElementById("issue-tracker");
const logInForm = document.getElementById("log-in");
const issuesContainer = document.getElementById("issues-container");
const spinner = document.getElementById("spinner");
const allButton = document.getElementById("all-button");
const openButton = document.getElementById("open-button");
const closedButton = document.getElementById("closed-button");

// function for log in form
const signInBtn = () => {
    spinner.classList.remove("hidden");
    if (userId.value === "admin" && userPassword.value === "admin123") {
        issueTracker.classList.remove("hidden");
        logInForm.classList.add("hidden");
        spinner.classList.add("hidden");
        openButton.classList.remove("btn-primary");
        closedButton.classList.remove("btn-primary");
    } else {
        alert("invalid UserId or Password")
    }
}

// function for fetching API for all issues
const loadIssues = async () => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    const res = await fetch(url);
    const json = await res.json();
    displayIssue(json.data);
    openButton.classList.remove("btn-primary");
    allButton.classList.add("btn-primary");
    closedButton.classList.remove("btn-primary");
}

// function for fetching API for open issues
const filterOpen = async () => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

    fetch(url)
        .then(res => res.json())
        .then(json => {
            const openIssues = json.data.filter(issue => issue.status === "open");
            displayIssue(openIssues);
            openButton.classList.add("btn-primary");
            allButton.classList.remove("btn-primary");
            closedButton.classList.remove("btn-primary");
        });
};

// function for fetching API for closed issues
const filterClosed = async () => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

    fetch(url)
        .then(res => res.json())
        .then(json => {
            const closedIssues = json.data.filter(issue => issue.status === "closed");
            displayIssue(closedIssues);
            openButton.classList.remove("btn-primary");
            allButton.classList.remove("btn-primary");
            closedButton.classList.add("btn-primary");
        });
};

// function for display issue cards 
const displayIssue = async (issues) => {
    issuesContainer.innerHTML = "";

    for (let issue of issues) {
        const issueDiv = document.createElement("div");

        let statusIcon;
        let statusDesign;
        let borderStyle;
        if (issue.priority === "high") {
            statusIcon = `<img src="./Open-Status.png" alt="">`;
            statusDesign = `class="border-1 rounded-full px-3 bg-red-100 p-1 text-red-700"`;
            borderStyle = `rounded-md border-t-4 border-green-500`;
        } else if (issue.priority === "medium") {
            statusIcon = `<img src="./Open-Status.png" alt="">`;
            statusDesign = `class="border rounded-full px-3 bg-yellow-100 p-1 text-yellow-700"`;
            borderStyle = `rounded-md border-t-4 border-green-500`;
        } else {
            statusIcon = `<img src="./Closed- Status .png" alt="">`
            statusDesign = `class="border rounded-full px-3 bg-gray-100 p-1 text-gray-700"`;
            borderStyle = `rounded-md border-t-4 border-purple-500`;
        };

        issueDiv.innerHTML = `
            <div class="p-3 bg-slate-200 space-y-4 h-full ${borderStyle}">
            <div class="flex justify-between items-center">
                <div>${statusIcon}</div>
                <div  ${statusDesign}><span>${issue.priority}</span></div>
            </div>
            <h2 class="font-bold">${issue.title}</h2>
            <p class="text-gray-500">${issue.description}</p>
            <div class="flex justify-between">
                <div><span class="border rounded-full px-3 py-1 bg-red-100 text-red-700">${issue.labels[0] ?? ""}</span></div>
                <div><span class="border rounded-full px-3 py-1 bg-yellow-100 text-yellow-700">${issue.labels[1] ?? ""}</span></div>
            </div>
            <hr class="">
            <p class=""><span>#${issue.id}</span> ${issue.assignee}</p>
            <p class="">${issue.createdAt.split("T")[0]}</p>
        </div>
        `;
        // screeningStatus(issue, issueDiv);
        issuesContainer.append(issueDiv);
    }
}

loadIssues();

document.getElementById("search-button").addEventListener("click", ()=>{
    const input = document.getElementById("serch-input");
    const searchValue = input.value.trim().toLowerCase();
    console.log(searchValue);
})
