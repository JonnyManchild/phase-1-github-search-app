addEventListener("DOMContentLoaded", function() {
    const searchForm = document.getElementById('github-form');
    const searchBox = document.getElementById('search');
    const userSearchResults = document.getElementById('user-list');
    const repoSearchResults = document.getElementById('repos-list');
    const submitUserSearch = searchForm.getElementsByTagName('input')[1];
    submitUserSearch.value = "Search Users";
    const submitRepoSearch = document.createElement('input');
    submitRepoSearch.type = 'submit';
    submitRepoSearch.value = "Search Repos";
    searchForm.appendChild(submitRepoSearch);
    submitUserSearch.addEventListener("click", function(event) {
        event.preventDefault();
        userSearchResults.innerHTML = '';
        repoSearchResults.innerHTML = '';
        fetch(`https://api.github.com/search/users?q=${searchBox.value}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (const user of data.items) {
                let userName = user.login;
                let userAvatar = user.avatar_url;
                let userLink = user.html_url;

                let result = document.createElement('li');

                let nameElement = document.createElement('p');
                let avatarElement = document.createElement('img');
                let linkElement = document.createElement('a');

                nameElement.textContent = userName;
                avatarElement.src = userAvatar;
                linkElement.textContent = userLink;
                linkElement.href = userLink;

                result.appendChild(nameElement);
                result.appendChild(avatarElement);
                result.appendChild(linkElement);

                userSearchResults.appendChild(result)
            }    
        })
        .catch(function (error) {
            console.error('Error:', error.message)
        });
    });
    userSearchResults.addEventListener('click', function(event) {
        repoSearchResults.innerHTML = '';
        let userElement = event.target.closest('li');
        if (userElement) {
            let userName = userElement.querySelector('p').textContent
            fetch(`https://api.github.com/users/${userName}/repos`)
            .then(function (response) {
                return response.json();
            })
            .then(function (repositories) {
                for (const repository of repositories) {
                let repoName = repository.name;
                let repoLink = repository.html_url;

                let result = document.createElement('li');

                let nameElement = document.createElement('p');
                let linkElement = document.createElement('a');

                nameElement.textContent = repoName;
                linkElement.textContent = repoLink;
                linkElement.href = repoLink;

                result.appendChild(nameElement);
                result.appendChild(linkElement);

                repoSearchResults.appendChild(result);
                };
            });
        };
    });
    submitRepoSearch.addEventListener('click', function(event) {
        event.preventDefault()
        fetch(`https://api.github.com/search/repositories?q=${searchBox.value}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (const repository of data.items) {
                let repoName = repository.name;
                let repoLink = repository.html_url;

                let result = document.createElement('li');

                let nameElement = document.createElement('p');
                let linkElement = document.createElement('a');

                nameElement.textContent = repoName;
                linkElement.textContent = repoLink;
                linkElement.href = repoLink;

                result.appendChild(nameElement);
                result.appendChild(linkElement);

                repoSearchResults.appendChild(result);
            }
        })
        .catch(function (error) {
            console.error('Error:', error.message);
        });
    });
})