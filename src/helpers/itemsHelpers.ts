import OBR, { ContextMenuContext, Item } from '@owlbear-rodeo/sdk';

export const ID = 'it.rubenspischedda.owlbearextensions.torero';

export interface Token {
  id: string;
  userId: string;
  image: string;
  label: string;
  name: string;
}

type CorrectedItem = { image: { url:string }, text: { plainText: string } } & Item;

export function setupContextMenu(onAddTokens: (token: Token[]) => void) {
  OBR.contextMenu.create({
    id: `${ID}/context-menu`,
    icons: [
      {
        icon: '/bull.svg',
        label: 'Add to Torero',
        filter: {
          every: [{ key: 'layer', value: 'CHARACTER' }],
        },
      },
    ],
    onClick(menuContext: ContextMenuContext) {
      onAddTokens(
        menuContext.items.map((token: Item) => ({
          id: token.id,
          userId: token.createdUserId,
          image: (token as unknown as CorrectedItem).image.url,
          label: (token as unknown as CorrectedItem).text.plainText,
          name: token.name,
        }))
      );
    },
  });
}
