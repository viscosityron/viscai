
import { DocumentProcessorServiceClient } from '@google-cloud/documentai';
import fs from 'fs/promises';

export async function processSpecializedDoc(projectId: string, location: string, processorId: string, filePath: string) {

  const client = new DocumentProcessorServiceClient();

  async function processSpecializedDoc() {
    const name = `projects/${projectId}/locations/${location}/processors/${processorId}`;

    const imageFile = await fs.readFile(filePath);
    const encodedImage = Buffer.from(imageFile).toString('base64');

    const request = {
      name, 
      rawDocument: {
        content: encodedImage,
        mimeType: 'application/pdf',
      },
    }; 
    const [result] = await client.processDocument(request); // recognize text entities in doc
    const { document, humanReviewStatus } = result;
    if (document != null && document.entities != null) {
      for (const entity of document.entities) {
        const key = entity.type;
        const textValue = entity.textAnchor != null ? entity.textAnchor.content : '';
        const conf = entity.confidence != null ? entity.confidence * 100 : 0;
        console.log(`* ${JSON.stringify(key)}: ${JSON.stringify(textValue)}(${conf.toFixed(2)}% confident)`);
      }
    }
  }
  await processSpecializedDoc();
}