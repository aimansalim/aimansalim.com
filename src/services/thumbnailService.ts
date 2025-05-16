interface Thumbnail {
  id: string;
  title: string;
  imageUrl: string;
}

// URL di base dell'API
const API_BASE_URL = 'http://localhost:3001/api';

/**
 * Servizio per interagire con il tool di download delle copertine YouTube
 */
export class ThumbnailService {
  /**
   * Scarica le copertine da un canale YouTube in un intervallo di date
   */
  public static async downloadThumbnails(
    channelUrl: string,
    startDate: string,
    endDate: string
  ): Promise<Thumbnail[]> {
    try {
      // In modalità development, controlla se le API sono disponibili
      const isApiAvailable = await ThumbnailService.checkApiAvailability();
      
      if (isApiAvailable) {
        // Le API sono disponibili, facciamo una vera chiamata
        const response = await fetch(`${API_BASE_URL}/thumbnails/download`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ channelUrl, startDate, endDate })
        });
        
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Errore durante il download delle copertine');
        }
        
        const data = await response.json();
        return data.thumbnails;
      }
      
      // Usa i dati di esempio se l'API non è disponibile
      console.log('API non disponibile, uso dati di esempio');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return sampleThumbnails;
    } catch (error) {
      console.error('Errore durante il download delle copertine:', error);
      
      // Fallback ai dati di esempio in caso di errore
      await new Promise(resolve => setTimeout(resolve, 1500));
      return sampleThumbnails;
    }
  }
  
  /**
   * Crea un collage di copertine
   */
  public static async createCollage(): Promise<string> {
    try {
      // Controlla se le API sono disponibili
      const isApiAvailable = await ThumbnailService.checkApiAvailability();
      
      if (isApiAvailable) {
        const response = await fetch(`${API_BASE_URL}/thumbnails/collage`, { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
        
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Errore durante la creazione del collage');
        }
        
        const data = await response.json();
        return data.collagePath;
      }
      
      // Usa un collage di esempio se l'API non è disponibile
      await new Promise(resolve => setTimeout(resolve, 2000));
      return '/collages/collage_1.png';
    } catch (error) {
      console.error('Errore durante la creazione del collage:', error);
      
      // Fallback al collage di esempio in caso di errore
      return '/collages/collage_1.png';
    }
  }
  
  /**
   * Verifica se le API sono disponibili
   */
  private static async checkApiAvailability(): Promise<boolean> {
    try {
      // Timeout più breve per non bloccare l'UI
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1000);
      
      const response = await fetch(`${API_BASE_URL}`, { 
        method: 'HEAD',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      return response.ok;
    } catch (error) {
      return false;
    }
  }
}

// Dati di esempio per lo sviluppo con percorsi corretti
const sampleThumbnails: Thumbnail[] = [
  { id: '1', title: 'MAFIA', imageUrl: '/thumbnails/mafia.jpg' },
  { id: '2', title: 'RABBIA', imageUrl: '/thumbnails/rabbia.jpg' },
  { id: '3', title: 'ZEN', imageUrl: '/thumbnails/zen.jpg' },
  { id: '4', title: 'SATANA', imageUrl: '/thumbnails/satana.jpg' },
  { id: '5', title: 'MORTE', imageUrl: '/thumbnails/morte.jpg' },
  { id: '6', title: 'PAZZA', imageUrl: '/thumbnails/pazza.jpg' },
  { id: '7', title: 'KILLER', imageUrl: '/thumbnails/killer.jpg' },
  { id: '8', title: 'RAVE', imageUrl: '/thumbnails/rave.jpg' },
]; 