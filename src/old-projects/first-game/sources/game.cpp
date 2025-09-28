#include <raylib.h>
#define SCREEN_RES_X 1200
#define SCREEN_RES_Y 600
#define SPEED 2
#define SIZE 50

typedef struct objectCreate{
	Vector2 position, speed, size;
	float angle, angleSpeed;
	Color color;
} objectCreate;

Color chroma( int index ){
	static float r = 255, g = 0, b = 0;
	if( index > 0 ){
		for( int i = 0; i < index; i++ ){
			if( r == 255 && g >= 0 && b == 0 )   g++;
			if( r <= 255 && g == 255 && b == 0 ) r--;
			if( r == 0 && g == 255 && b >= 0 )   b++;
			if( r == 0 && g <= 255 && b == 255 ) g--;
			if( r >= 0 && g == 0 && b == 255 )   r++;
			if( r == 255 && g == 0 && b <= 255 ) b--;
		}
	}
	else if( index < 0 ){
		for( int i = 0; i < index * -1; i++ ){
			if( r == 255 && g == 0 && b >= 0 )   b++;
			if( r <= 255 && g == 0 && b == 255 ) r--;
			if( r == 0 && g >= 0 && b == 255 )   g++;
			if( r == 0 && g == 255 && b <= 255 ) b--;
			if( r >= 0 && g == 255 && b == 0 )   r++;
			if( r == 255 && g <= 255 && b == 0 ) g--;
		}
	}
	return Color{ ( unsigned char ) r, ( unsigned char ) g, ( unsigned char ) b, 255 };
}

int main(){
	bool debug = false, instructions = false, chromaStart = false;
	float cameraAngleSpeed = 0, cameraZoomSpeed = 0;
	int chromaSpeed = 1;
	InitWindow( SCREEN_RES_X, SCREEN_RES_Y, "Test Game by GamerZ-0216" );
	SetTargetFPS( 60 );

	objectCreate player = { 0 };
	player.position = Vector2{ 0, 0 };
	player.size = Vector2{ SIZE, SIZE };
	player.color = WHITE;

	Camera2D camera = { 0 };
	camera.target = player.position;
	camera.offset = Vector2{ SCREEN_RES_X / 2, SCREEN_RES_Y / 2 };
	camera.zoom = 1;
	camera.rotation = 0;

	Image image = LoadImage( "textures/Iron_Frame.png" );
	Texture2D texture = LoadTextureFromImage( image );

	while( !WindowShouldClose() ){

		if( IsKeyDown( KEY_LEFT_CONTROL ) || IsKeyDown( KEY_RIGHT_CONTROL ) ){
			if( IsKeyDown( KEY_D ) ) player.speed.x += SPEED * 5;
			if( IsKeyDown( KEY_A ) ) player.speed.x -= SPEED * 5;
			if( IsKeyDown( KEY_S ) ) player.speed.y += SPEED * 5;
			if( IsKeyDown( KEY_W ) ) player.speed.y -= SPEED * 5;
			if( IsKeyDown( KEY_E ) ) player.angleSpeed += SPEED * 2;
			if( IsKeyDown( KEY_Q ) ) player.angleSpeed -= SPEED * 2;
			if( IsKeyDown( KEY_SEMICOLON ) ) cameraAngleSpeed -= SPEED;
			if( IsKeyDown( KEY_APOSTROPHE ) ) cameraAngleSpeed += SPEED;
		}
		else{
			if( IsKeyDown( KEY_D ) ) player.speed.x += SPEED;
			if( IsKeyDown( KEY_A ) ) player.speed.x -= SPEED;
			if( IsKeyDown( KEY_S ) ) player.speed.y += SPEED;
			if( IsKeyDown( KEY_W ) ) player.speed.y -= SPEED;
			if( IsKeyDown( KEY_E ) ) player.angleSpeed += SPEED / 2;
			if( IsKeyDown( KEY_Q ) ) player.angleSpeed -= SPEED / 2;
			if( IsKeyDown( KEY_SEMICOLON ) ) cameraAngleSpeed -= SPEED * 0.2;
			if( IsKeyDown( KEY_APOSTROPHE ) ) cameraAngleSpeed += SPEED * 0.2;
		}
		if( IsKeyPressed( KEY_BACKSLASH ) ) chromaStart = !chromaStart;
		if( !chromaStart ){
			if( IsKeyDown( KEY_LEFT_BRACKET ) ) player.color = chroma( -1 );
			if( IsKeyDown( KEY_RIGHT_BRACKET ) ) player.color = chroma( 1 );
		}
		else{
			if( IsKeyDown( KEY_LEFT_BRACKET ) ) chromaSpeed--;
			if( IsKeyDown( KEY_RIGHT_BRACKET ) ) chromaSpeed++;
		}
		if( IsKeyDown( KEY_GRAVE ) ){
			player.position = Vector2{ 0, 0 };
			player.speed = Vector2{ 0, 0 };
			player.size = Vector2{ SIZE, SIZE };
			player.angle = 0;
			player.angleSpeed = 0;
			camera.rotation = 0;
			camera.offset = Vector2{ SCREEN_RES_X / 2, SCREEN_RES_Y / 2 };
			cameraAngleSpeed = 0;
			cameraZoomSpeed = 0;
			chromaStart = false;
			chromaSpeed = 1;
		}
		if( IsKeyPressed( KEY_F5 ) ) debug = !debug;
		if( IsKeyPressed( KEY_F6 ) ){ instructions = !instructions; debug = false; }
		cameraZoomSpeed += GetMouseWheelMove() * 0.02 ;

		camera.target = player.position;
		player.position.x += player.speed.x;
		player.position.y += player.speed.y;
		player.angle += player.angleSpeed;
		player.speed.x = player.speed.x * 0.9;
		player.speed.y = player.speed.y * 0.9;
		player.angleSpeed = player.angleSpeed * 0.9;
		player.color = chroma( 0 );
		camera.rotation += cameraAngleSpeed;
		camera.zoom += cameraZoomSpeed;
		cameraAngleSpeed = cameraAngleSpeed * 0.9;
		cameraZoomSpeed = cameraZoomSpeed * 0.9;

		if( chromaStart ) chroma( chromaSpeed );
		if( camera.zoom > 10 ) camera.zoom = 10;
		else if( camera.zoom < 0.125 ) camera.zoom  = 0.125;

		BeginDrawing();
			ClearBackground( WHITE );

			BeginMode2D(camera);
				DrawTexturePro( texture, Rectangle{ 0, 0, ( float ) image.width, ( float ) image.height },  Rectangle{ player.position.x, player.position.y, player.size.x, player.size.y }, Vector2{ player.size.x / 2, player.size.y / 2 }, player.angle, player.color );
			EndMode2D();

			DrawRectangle( SCREEN_RES_X - 130, 10, 120, 40, BLACK );
			DrawRectangleLinesEx( Rectangle{  SCREEN_RES_X - 130, 10, 120, 40 }, 5, GRAY );
			DrawFPS( SCREEN_RES_X - 100, 20 );

			if( debug ){
				instructions = false;
				DrawText( "DEBUG MENU:", 20, 20, 20, BLACK );
				DrawText( "X: ", 20, 40, 20, BLACK );
				DrawText( TextFormat( "%f", player.position.x ), 60, 40, 20, BLACK );
				DrawText( "Y: ", 20, 60, 20, BLACK );
				DrawText( TextFormat( "%f", player.position.y ), 60, 60, 20, BLACK );
				DrawText( "A: ", 20, 80, 20, BLACK );
				DrawText( TextFormat( "%f", player.angle ), 60, 80, 20, BLACK );
				DrawText( "XS: ", 20, 100, 20, BLACK );
				DrawText( TextFormat( "%f", player.speed.x ), 60, 100, 20, BLACK );
				DrawText( "YS: ", 20, 120, 20, BLACK );
				DrawText( TextFormat( "%f", player.speed.y ), 60, 120, 20, BLACK );
				DrawText( "AS: ", 20, 140, 20, BLACK );
				DrawText( TextFormat( "%f", player.angleSpeed ), 60, 140, 20, BLACK );
				DrawText( ":COLOR:", 20, 160, 20, player.color );
				DrawText( TextFormat( "R: %i, G: %i, B: %i, ChromaSpeed: %i", player.color.r, player.color.g, player.color.b, chromaSpeed ), 100, 160, 20, BLACK );
			}
			if( instructions && !debug ){
				debug = false;
				DrawText( "Movements: W A S D", 20, 20, 20, BLACK );
				DrawText( "Rotation: Q E", 20, 40, 20, BLACK );
				DrawText( "Color: [ ]", 20, 60, 20, BLACK );
				DrawText( "Reset: `", 20, 80, 20, BLACK );
				DrawText( "Camera Zoom: Mouse Wheel", 20, 100, 20, BLACK );
				DrawText( "Camera Till: ; '", 20, 120, 20, BLACK );
				DrawText( "Toggle Chroma: \\", 20, 140, 20, BLACK );
				DrawText( "Use [ ] to increase / decrease chroma speed when chroma is on", 20, 160, 20, BLACK );
				DrawText( "Hold Ctrl to make things faster", 20, 180, 20, BLACK );
			}
		EndDrawing();
	}
}
