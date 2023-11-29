import { Session } from "@remix-run/node";
export const SESSION_KEY = "cart";
export type SessionCart = {
  [key: string | number]: number;
};

export class CartServices {
  private readonly sessionKey: string = SESSION_KEY;

  constructor(private session: Session) {}

  getCart() {
    return this.session.get(this.sessionKey) ?? {};
  }

  saveCart(cart: SessionCart): void {
    this.session.set(this.sessionKey, cart);
  }

  add(productId: string | number): void {
    const cart = this.getCart();

    cart[productId] = (cart[productId] ?? 0) + 1;
    this.saveCart(cart);
  }

  remove(productId: string | number): void {
    const cart = this.getCart();

    delete cart[productId];
    this.saveCart(cart);
  }

  items(): { productId: string; quantity: number }[] {
    const cart = this.getCart();

    return Object.entries(cart).map(([productId, quantity]) => ({
      productId,
      quantity: quantity as number,
    }));
  }
}

export const createCart = (session: Session) => new CartServices(session);
