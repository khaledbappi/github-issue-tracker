const loadIssues = () => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

    fetch(url)
        .then(res => res.json())
        .then(json => displayIssue(json.data));
}


const displayIssue = (issues) => {
    const issuesContainer = document.getElementById("issues-container");
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

        issuesContainer.append(issueDiv);
    }
}

loadIssues();
