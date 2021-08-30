export function joinClassNames() {
    let final = "";

    for (let i = 0; i < arguments.length; i++) {
        switch (typeof(arguments[i])) {
            case (Array.isArray(arguments[i]) && typeof(arguments[i][0]) === "boolean" && "object"):
                if (arguments[i][0] === true)
                    final += arguments[i][1];
                else if (arguments[i][2])
                    final += arguments[i][2];
                break;

            default:
                final += arguments[i];
                break;
        }

        final += " ";
    }

    return final.trim();
}

export function getRandomKey() { return Math.random().toString(36).substr(7); }