document.addEventListener('DOMContentLoaded', () => {
    const headerChatContainer = document.querySelector('.container-header-chat');
    headerChatContainer.addEventListener('click', desplegarChat)
})

function desplegarChat() {
    const chatContainer = document.querySelector('.messageContainer');
    chatContainer.classList.toggle('minimized')
    chatContainer.classList.toggle('expanded')
}