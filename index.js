addEventListener("fetch", event => {
    return event.respondWith(handleRequest(event));
});

const links = [
    {
        "name": "My Repository for Cloudflare 2020 General Engineering Assignment",
        "url": "https://github.com/lynnmiro/cloudflare-2020-general-engineering-assignment"
    },
    {
        "name": "My Portfolio",
        "url": "https://lynnmiro.github.io/"
    },
    {
        "name": "Easy Table App",
        "url": "https://bitbucket.org/lmiroitmd451519s/lmiro-fp/src/master"
    }
]


class AvatarTransformer {
    async element(element) {
        element.setAttribute("src", "https://raw.githubusercontent.com/lynnmiro/media/main/Screen%20Shot%202020-09-02%20at%205.10.31%20PM.png");
    }
}
class BackgroundTransformer {
    async element(element) {
        element.setAttribute("class", "bg-blue-900");
    }
}
class LinksTransformer {
    constructor(links) {
        this.links = links
    }

    async element(element) {
        links.forEach(link => {
            element.append(`<a href="${link.url}">${link.name}</a>`, { html: true });
        })
    }

}

class ProfileTransformer {
    async element(element) {
        element.removeAttribute('style');
        element.get
    }
}
class SocialTransformer {
    async element(element) {
        element.removeAttribute('style');
        element.append("<a href=\"https://linkedin.com/in/lynnmiro\"><img src=\"https://www.flaticon.com/svg/static/icons/svg/61/61109.svg\"></a>", { html: true })
        element.append("<a href=\"https://github.com/lynnmiro\"><img src=\"https://www.flaticon.com/svg/static/icons/svg/37/37318.svg\"></a>", { html: true })
    }
}

class TitleTransformer {
    async element(element) {
        element.setInnerContent("Lynn Miro");
    }
}
class UsernameTransformer {
    async element(element) {
        element.setInnerContent("Lynn Miro");
    }
}

async function handleRequest(event) {
    const url = new URL(event.request.url);
    let element = url.pathname.split("/").filter(n => n);

    if (element[0] === "links") {
        const json = JSON.stringify(links, null, 2);
        return new Response(json, {
            headers: {
                "content-type": "application/json;charset=UTF-8"
            }
        })

    } else if (element[0] === undefined) {
        //const HTML = "<html><body>Index</body></html>";
        const headers = {
            headers: {
                "content-type": "text/html;charset=UTF-8"
            },
        }

        const Response = await fetch("https://static-links-page.signalnerve.workers.dev/", headers)

        return new HTMLRewriter()
            .on("div#links", new LinksTransformer())
            .on("div#profile", new ProfileTransformer())
            .on("img#avatar", new AvatarTransformer())
            .on("h1#name", new UsernameTransformer())
            .on("title", new TitleTransformer())
            .on("div#social", new SocialTransformer())
            .on("body", new BackgroundTransformer())
            .transform(Response);
    } else {
        return new Response("Error 404", { status: "404" });
    }
}