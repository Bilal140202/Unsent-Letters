document.addEventListener('DOMContentLoaded', () => {
    const postLetterForm = document.getElementById('post-letter-form');

    if (postLetterForm) {
        const letterContent = document.getElementById('letter-content');
        const emotionTag = document.getElementById('emotion-tag');

        postLetterForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const content = letterContent.value.trim();
            const tag = emotionTag.value;

            if (!content) {
                alert('Please write your letter.');
                letterContent.focus();
                return;
            }

            if (!tag) {
                alert('Please select a tag for your letter.');
                emotionTag.focus();
                return;
            }

            try {
                const response = await fetch('/api/letters', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ content, tag }),
                });

                if (response.status === 201) {
                    // Successfully created
                    alert('Letter submitted successfully!');
                    window.location.href = 'feed.html'; // Redirect to feed page
                } else {
                    // Handle other errors (e.g., 400, 500)
                    const errorData = await response.json();
                    alert(`Error submitting letter: ${errorData.error || response.statusText}`);
                }
            } catch (error) {
                console.error('Failed to submit letter:', error);
                alert('An error occurred while submitting your letter. Please try again.');
            }
        });
    }

    // --- Feed Page (feed.html) Functionality ---
    const lettersFeedContainer = document.getElementById('letters-feed-container');

    if (lettersFeedContainer) {
        async function fetchAndDisplayLetters(tag = '') { // Added tag parameter
            let url = '/api/letters';
            if (tag) {
                url += `?tag=${encodeURIComponent(tag)}`;
            }

            try {
                const response = await fetch(url); // Use modified URL
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const letters = await response.json();

                lettersFeedContainer.innerHTML = ''; // Clear "Loading..." or old content

                if (letters.length === 0) {
                    lettersFeedContainer.innerHTML = '<p>No letters yet. Be the first to write one!</p>';
                    return;
                }

                letters.forEach(letter => {
                    const letterDiv = document.createElement('div');
                    // Tailwind classes for card-like appearance
                    letterDiv.className = 'bg-white shadow-lg rounded-lg p-6 mb-6 break-words';

                    const contentP = document.createElement('p');
                    contentP.className = 'text-gray-700 text-lg mb-4 whitespace-pre-wrap'; // Preserve line breaks
                    contentP.textContent = letter.content;

                    const detailsDiv = document.createElement('div');
                    detailsDiv.className = 'flex justify-between items-center mt-4';

                    const tagSpan = document.createElement('span');
                    // Basic tag styling, can be enhanced with different colors per tag
                    tagSpan.className = 'bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded';
                    tagSpan.textContent = `#${letter.tag}`;

                    const timestampSpan = document.createElement('span');
                    timestampSpan.className = 'text-sm text-gray-500';
                    timestampSpan.textContent = new Date(letter.timestamp).toLocaleString();

                    // ID is not typically shown to users, but if needed for debugging:
                    // const idSpan = document.createElement('span');
                    // idSpan.className = 'text-xs text-gray-400';
                    // idSpan.textContent = `ID: ${letter.id}`;

                    detailsDiv.appendChild(tagSpan);
                    detailsDiv.appendChild(timestampSpan);

                    letterDiv.appendChild(contentP);
                    letterDiv.appendChild(detailsDiv);
                    // letterDiv.appendChild(idSpan); // If ID needs to be visible

                    lettersFeedContainer.appendChild(letterDiv);
                });

            } catch (error) {
                console.error('Error fetching letters:', error);
                lettersFeedContainer.innerHTML = '<p>Could not load letters. Please try again later.</p>';
            }
        }

        fetchAndDisplayLetters(); // Initial load (all letters)

        const filterButtons = document.querySelectorAll('.tag-filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tag = button.dataset.tag;
                fetchAndDisplayLetters(tag);
            });
        });
    }
});
