export interface AlternateEnding  {
  title: string;
  content: string;
}

interface Ending extends AlternateEnding {
  image: string;
}

export function extractAlternateEndings(text: string): AlternateEnding[] {
  const endings: AlternateEnding[] = [];

  const regex = /Title: "(.*?)".*?((?:(?!Title:).)*)/gs;
  let match;
  while (match = regex.exec(text)) {
      const [, title, content] = match;
      endings.push({ title, content: content.trim() });
  }

  return endings;
}

// Your async function to fetch images
async function fetchImage(title: string, summary: string): Promise<string> {
  try {
    const prompt = `create an image that fits this show title ${title} with this as a summary of it ${summary}`
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/bytedance/stable-diffusion-xl-lightning`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_AUTH_TOKEN}`,
        },
        body: JSON.stringify({ prompt  }),
      }
    );

    if (response.ok) {
      const imageData = await response.arrayBuffer();
      return Buffer.from(imageData).toString("base64")
    } else {
      return ''; // Return an empty string if the API call fails
    }
  } catch (error) {
    console.error('Error fetching image:', error);
    return ''; // Return an empty string if an error occurs
  }
}

async function processAlternateEnding(movie: string, ending: AlternateEnding): Promise<Ending> {
  try {
    const image = await fetchImage(movie+" "+ending.title, ending.content);
    return { ...ending, image: "data:image/png;base64,"+image };
  } catch (error) {
    console.error('Error processing AlternateEnding:', error);
    return { ...ending, image: '' }; // Return the object with an empty image field if an error occurs
  }
}

export async function processAlternateEndingsArray(movie: string, inputArray: AlternateEnding[]): Promise<Ending[]> {
  try {
    const processedEndings = await Promise.all(inputArray.map((details) => processAlternateEnding(movie, details)));
    return processedEndings;
  } catch (error) {
    console.error('Error processing AlternateEndings array:', error);
    return []; // Return an empty array if an error occurs
  }
}