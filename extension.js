
window.addEventListener('DOMContentLoaded', event => {
    const sidebarDiscussionNode = document.querySelector('div.discussion-sidebar-item.sidebar-labels.js-discussion-sidebar-item')
    const parentNode = sidebarDiscussionNode.parentNode;

    console.log(sidebarDiscussionNode)

    const divToInject =
        `<div>
            <button type="button" class="discussion-sidebar-heading discussion-sidebar-toggle js-menu-target">
                Bounty
            </button>
            <button type="submit">
                Add JECoin to PR bounty
            </button>
        </div>`

    const ourDiv = document.createElement('div');
    ourDiv.classList.add("discussion-sidebar-item",
                         "sidebar-labels",
                         "js-discussion-sidebar-item"
                     );

    ourDiv.innerHTML = divToInject;

    const bla = parentNode.insertBefore(ourDiv, sidebarDiscussionNode);




})
