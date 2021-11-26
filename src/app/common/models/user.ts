export class User {
	ID!: number
	Username!: string
	Password!: string
	Nickname!: string
	Phone!: string
	Email!: string
	Status!: number
	CreatedAt!: number
	CreatedBy!: string
	ModifiedAt!: number
	ModifiedBy!: string

	Token!: string // 网站令牌。访问数据操作时验证。
 // 网站令牌。访问数据操作时验证。
	
	constructor() {	}
}