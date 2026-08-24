import { Module } from '@nestjs/common';
import { DrizzleModule } from './drizzle/drizzle.module';
import { RolesModule } from './RolesModule/roles.module';
import { AuthModule } from './AuthModule/auth.module';
import { UserModule } from './UserModule/user.module';

@Module({
  imports: [ DrizzleModule, AuthModule, RolesModule, UserModule, ],

  controllers: [],
  providers: [],
})
export class AppModule {}