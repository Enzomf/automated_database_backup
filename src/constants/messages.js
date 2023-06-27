export const messages = {
  error: (message_content) => {
    return {
      content: message_content.content ?? null,
      embeds: [
        {
          title: message_content.title ?? null,
          description: message_content.description ?? null,
          image: {
            color: 15400960,
            url: "https://preview.redd.it/0g75x7lp1xf31.jpg?auto=webp&s=1ba67c4fe8dcddbdf54134a6fb3e4cd76c187415",
          },
        },
      ],
    };
  },

  success: (message_content) => {
    return {
      content: message_content.content ?? null,
      embeds: [
        {
          title: message_content.title ?? null,
          description: message_content.description ?? null,
          image: {
            color: 4718336,
            url: "https://pbs.twimg.com/media/Ee1OncjXYAAXRp7.jpg",
          },
        },
      ],
    };
  },
};
