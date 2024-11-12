

const addBookmarkButton = document.getElementById('addBookmarkButton');
let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [] ; 

addBookmarks();

addBookmarkButton.addEventListener('click', (e) => {
    e.preventDefault();
    const name = document.getElementById('websiteName').value;
    const url = document.getElementById('websiteURL').value;

    if (!name) {
        const nameError = document.getElementById('nameError');
        nameError.innerText = 'Please enter website name';
        return;
    }
    nameError.innerHTML = '';

    if (!url) {
        const urlError = document.getElementById('urlError');
        urlError.innerText = 'Please enter a valid website URL';
        return;
    }

    const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/;
    if (!urlPattern.test(url)) {
        const urlError = document.getElementById('urlError');
        urlError.innerText = 'Please enter a valid website URL';
        return;
    }
    urlError.innerHTML = '';

    const bookmark = { name, url };
    bookmarks.push(bookmark);

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    document.getElementById('websiteName').value = '';
    document.getElementById('websiteURL').value = '';

    addBookmarks();
});

function deleteBookmark(index) {
    bookmarks.splice(index, 1);

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    addBookmarks();
}

function editBookmark(index) {
    const newName = prompt("Enter the new name:", bookmarks[index].name);
    const newURL = prompt("Enter the new URL:", bookmarks[index].url);

    if (newName && newURL) {
        bookmarks[index] = { name: newName, url: newURL };

        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

        addBookmarks();
    }
}

function addBookmarks() {
    const bookmarksList = document.getElementById('bookmarksList');
    bookmarksList.innerHTML = '';

    bookmarks.forEach((bookmark, index) => {
        const bookmarkDiv = document.createElement('div');
        bookmarkDiv.classList.add('bookmark');

        bookmarkDiv.innerHTML = `
            <strong>${bookmark.name}</strong><br>
            <a href="${bookmark.url}" target="_blank"><i class="fas fa-globe"></i>${bookmark.url}</a><br>
            <div>
                <button class="edit" onclick="editBookmark(${index})"><i class="fas fa-edit"></i>Edit</button>
                <button onclick="deleteBookmark(${index})"><i class="fas fa-trash"></i>Delete</button>
            </div>
        `;

        bookmarksList.appendChild(bookmarkDiv);
    });
}
