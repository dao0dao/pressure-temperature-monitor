import { Component, input } from '@angular/core';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [],
  templateUrl: './icon.component.html',
})
export class IconComponent {
  name = input('');
  size = input(24);

  sprite = '/icons/icons-sprite.svg';
}
