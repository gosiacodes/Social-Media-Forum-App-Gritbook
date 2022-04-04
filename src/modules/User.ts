export class User {
  private username: string;
  private password: string;
  private desc: string;
  private imageUrl: string;

  constructor(
    username: string,
    password: string,
    desc: string,
    image: string
  ) {
   
    this.username = username;
    this.password = password;
    this.desc = desc;
    this.imageUrl = image;
  }

  getUsername() {
    return this.username;
  }

  getPassword() {
    return this.password;
  }

  getDesc() {
    return this.desc;
  }

  getImage() {
    return this.imageUrl;
  }
}
