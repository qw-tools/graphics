import { ModelViewerElement } from "@google/model-viewer";
import { Texture } from "@google/model-viewer/lib/features/scene-graph/texture";
import { dataUriFromFile } from "./domutil";

export interface QuakeModel {
  id: string;
  editorID: string;
  viewerID: string;
  modelPath: string;
  defaultTexturePath: string;
}

export class QuakeModelViewer {
  private readonly viewer: ModelViewerElement;

  constructor(containerID: string) {
    this.viewer = document.getElementById(containerID) as ModelViewerElement;
    this.viewer.addEventListener("load", () => this.onViewerLoaded());
  }

  public async onViewerLoaded(): Promise<void> {
    const defaultTexture = this.viewer.dataset.defaultTexture || null;

    if (defaultTexture) {
      await this.setTextureByURI(defaultTexture);
    }
  }

  public setTexture(texture: Texture): void {
    if (!this.viewer.model || 0 === this.viewer.model.materials.length) {
      return;
    }

    this.viewer.model.materials[0].pbrMetallicRoughness.baseColorTexture.setTexture(
      texture
    );
  }

  public async setTextureByURI(textureURI: string): Promise<void> {
    const texture = await this.viewer.createTexture(textureURI);

    if (texture) {
      this.setTexture(texture);
    }
  }

  public async setTextureByFile(textureFile: File): Promise<void> {
    const textureURI = await dataUriFromFile(textureFile);
    return this.setTextureByURI(textureURI);
  }
}
