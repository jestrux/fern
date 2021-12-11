
module.exports = /*html*/`
    <div>
        <div class="flex items-center mb-3">
            <span class="opacity-65" @click="this.screen = 'pick'">
                <svg height="18" viewBox="0 0 24 24" width="24">
                    <path fill="#333" d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"/>
                </svg>
            </span>
            
            <h2>Customize</h2>
        </div>

        <div>
            <div class="flex items-center justify-between">
                <label class="text-md">
                    Leading
                </label>

                ${toggle('props.leading')}
            </div>
        </div>
    </div>
`;