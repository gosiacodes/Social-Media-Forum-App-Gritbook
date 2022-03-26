class User {
  private img: string;
  private gender: string;
  private location: string;
  private username: string;
  private password: string;

  constructor(
    img: string,
    gender: string,
    location: string,
    username: string,
    password: string
  ) {
    this.img = img;
    this.gender = gender;
    this.location = location;
    this.username = username;
    this.password = password;
  }

  getImg() {
    return this.img;
  }

  getGender() {
    return this.gender;
  }

  getLocation() {
    return this.location;
  }

  getUsername() {
    return this.username;
  }
}
