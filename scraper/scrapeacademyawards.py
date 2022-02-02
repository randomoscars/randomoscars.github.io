# folder where the files will be located
result_folder = '../public/Data'

# url info for imdb
imdb_base_url = 'https://www.imdb.com/'
imdb_event_route = 'event/'

# id for the Academy Awards within imdb
event_imdb_id = 'ev0000003'

DEBUG = True

import sys

def print_progress_bar(iteration, total, prefix = '', suffix = '', decimals = 1, length = 100, fill = '█', print_end = "\r"):
    percent = ("{0:." + str(decimals) + "f}").format(100 * (iteration / float(total)))
    filled_length = int(length * iteration // total)
    bar = fill * filled_length + '-' * (length - filled_length)
    print('\r%s |%s| %s%% %s' % (prefix, bar, percent, suffix), end = print_end)
    if iteration == total:
        sys.stdout.write("\033[K") #clear line

from bs4 import BeautifulSoup
import requests
import urllib.request
import json
import re

def load_soup_for_url(url):
    progress_bar_text = '       ---- Url ' + url
    print_progress_bar(0, 50, prefix = progress_bar_text, suffix = 'Complete', length = 50)
    if DEBUG:
        print(url)
    try:
        with urllib.request.urlopen(url) as response:

            html = response.read().decode('utf-8')#use whatever encoding as per the webpage
            soup = BeautifulSoup(html, 'html.parser')
            print_progress_bar(50, 50, prefix = progress_bar_text, suffix = 'Complete', length = 50)
            return soup
    except urllib.request.HTTPError as e:
        print_progress_bar(50, 50, prefix = progress_bar_text, suffix = 'Complete', length = 50)
        if e.code==404:
            print(f"{url} is not found")
        elif e.code==503:
            print(f'{url} base webservices are not available')
            ## can add authentication here 
        else:
            print('http error',e)
            

def get_event_editions(event_imdb_id):
    event_soup = None
    try:
        event_soup = load_soup_for_url(imdb_base_url + imdb_event_route + event_imdb_id + '/2021/1')
    except:
        return None
    if event_soup is None:
        return
    event_soup_text = event_soup.text
    event_edition_start_index = event_soup_text.find('[{"eventEditionId":')
    if event_edition_start_index == -1:
        print('- could not find start index for editions')
        return
    event_edition_end_index = event_soup_text.find('}]', event_edition_start_index) + 2
    if event_edition_end_index == -1:
        print('- could not find end index for editions')
        return
    event_edition_text = event_soup_text[event_edition_start_index:event_edition_end_index]
    return json.loads(event_edition_text)

event_editions = get_event_editions(event_imdb_id)

def get_event_edition_widget_info(event_edition_url):
    event_edition_soup = None
    try:
        event_edition_soup = load_soup_for_url(event_edition_url)
    except:
        print('Error while trying to get event edition')
    if event_edition_soup is None:
        return
    event_edition_soup_text = event_edition_soup.text
    start_search_string = 'IMDbReactWidgets.NomineesWidget.push('
    event_nominees_start_index = event_edition_soup_text.find(start_search_string) + len(start_search_string)
    if event_nominees_start_index == -1:
        print('could not find start index for nominees')
        return
    end_search_string = '}}]);'
    event_nominees_end_index = event_edition_soup_text.find(end_search_string, event_nominees_start_index) + 3
    if event_nominees_end_index == -1:
        print('could not find end index for nominees')
        return
    event_nominees_text = event_edition_soup_text[event_nominees_start_index:event_nominees_end_index].replace("'center-3-react',", '')
    try:
        event_nominees_widget = json.loads(event_nominees_text)
        if event_nominees_widget is None:
            return
        return event_nominees_widget[0]['nomineesWidgetModel']['eventEditionSummary']
    except:
        print('Error getting nominees widget:', event_nominees_text)
    return

normalized_categories_setup = {
    'Best Motion Picture of the Year': [],
    'Best Performance by an Actor in a Leading Role': [
        'Best Actor in a Leading Role'
    ],
    'Best Performance by an Actress in a Leading Role': [
        'Best Actress in a Leading Role'
    ],
    'Best Performance by an Actor in a Supporting Role': [
        'Best Actor in a Supporting Role'
    ],
    'Best Performance by an Actress in a Supporting Role': [
        'Best Actress in a Supporting Role'
    ],
    'Best Achievement in Directing': [
        'Best Director'
    ],
    'Best Original Screenplay': [
        'Best Writing, Best Screenplay - Original',
        'Best Writing, Original Screenplay',
        'Best Writing, Original Story',
        'Best Writing, Screenplay Written Directly for the Screen',
        'Best Writing, Story and Screenplay - Written Directly for the Screen',
        'Best Writing, Story and Screenplay Based on Factual Material or Material Not Previously Published or Produced',
        'Best Writing, Story and Screenplay Based on Material Not Previously Published or Produced'
    ],
    'Best Adapted Screenplay': [
        'Best Writing, Adaptation',
        'Best Writing, Adapted Screenplay',
        'Best Writing, Best Screenplay - Adapted',
        'Best Writing, Screenplay Adapted From Other Material',
        'Best Writing, Screenplay Based on Material Previously Produced or Published',
        'Best Writing, Screenplay Based on Material from Another Medium'
    ],
    'Best Achievement in Cinematography': [
        'Best Cinematography'
    ],
    'Best Achievement in Film Editing': [
        'Best Film Editing'
    ],
    'Best Achievement in Production Design': [
        'Best Achievement in Art Direction',
        'Best Art Direction'
    ],
    'Best Achievement in Costume Design': [
        'Best Costume Design'
    ],
    'Best Sound': [],
    'Best Achievement in Sound Editing': [
        'Best Sound Editing'
    ],
    'Best Achievement in Sound Mixing': [
        'Best Sound Mixing'
    ],
    'Best Achievement in Makeup and Hairstyling': [
        'Best Achievement in Makeup',
        'Best Makeup'
    ],
    'Best Achievement in Music Written for Motion Pictures (Original Score)': [
        'Best Achievement in Music Written for Motion Pictures, Original Score',
        'Best Music, Original Music Score',
        'Best Music, Original Score',
        'Best Music, Score',
        'Best Music, Score - Substantially Original',
        'Best Music, Scoring',
        'Best Music, Substantially Original Score',
        'Best Music, Scoring of Music, Adaptation or Treatment'
    ],
    'Best Achievement in Music Written for Motion Pictures (Original Song)': [
        'Best Achievement in Music Written for Motion Pictures, Original Song',
        'Best Music, Original Song',
        'Best Music, Original Song Score',
        'Best Music, Original Song Score and Its Adaptation or Best Adaptation Score',
        'Best Music, Scoring Adaptation and Original Song Score',
        'Best Music, Scoring Original Song Score and/or Adaptation'
    ],
    'Best Music, Original Dramatic Score': [
        'Best Music, Original Score for a Motion Picture (not a Musical)',
        'Best Music, Scoring of a Dramatic Picture'
    ],
    'Best Music, Original Musical or Comedy Score': [
        'Best Music, Score of a Musical Picture (Original or Adaptation)',
        'Best Music, Scoring of a Musical Picture'
    ],
    'Best Achievement in Visual Effects': [
        'Best Effects, Special Visual Effects',
        'Best Effects, Visual Effects',
        'Best Visual Effects'
    ],
    'Best Special Effects': [
        'Best Effects, Engineering Effects',
        'Best Effects, Special Effects'
    ],
    'Best Documentary Feature': [
        'Best Documentary',
        'Best Documentary, Feature',
        'Best Documentary, Features'        
    ],
    'Best Documentary Short Subject': [
        'Best Documentary, Short Subject',
        'Best Documentary, Short Subjects'
    ],
    'Best Animated Feature Film': [
        'Best Animated Feature',
        'Best Animated Feature Film of the Year'
    ],
    'Best Animated Short Film': [
        'Best Short Film, Animated',
        'Best Short Subject, Animated Films',
        'Best Short Subject, Cartoons'
    ],
    'Best Live Action Short Film': [
        'Best Short Film, Live Action',
        'Best Short Subject, Live Action Films',
        'Best Short Subject, Live Action Subjects'
    ],
    'Best International Feature Film': [
        'Best Foreign Language Film',
        'Best Foreign Language Film of the Year'
    ]
}
normalized_category_names = {}
for key, value in normalized_categories_setup.items():
    for cat_name in value:
        normalized_category_names[cat_name] = key

def get_normalized_category_name(cat_name):
    if cat_name in normalized_category_names:
        return normalized_category_names[cat_name]
    return cat_name

category_names = []

def get_category_info(cat_name):
    normalized_name = get_normalized_category_name(cat_name)
    if not normalized_name in category_names:
        category_names.append(normalized_name)
    return {
        'name': cat_name,
        'normalized_name': normalized_name,
        'category_id': category_names.index(normalized_name),
        'candidates': []
    }

def get_nomination_enriched(nomination):
    return {
        'name': nomination['name'],
        'imdb_id': nomination['const'],
        'note': nomination['note'],
        'image': {
            'url': nomination['imageUrl'],
            'height': nomination['imageHeight'],
            'width': nomination['imageWidth']
        } if nomination['imageUrl'] is not None  else None
    }

def store_event_edition(idx, event_edition):
    event_edition_url = imdb_base_url + imdb_event_route + event_imdb_id + '/' + str(event_edition['year']) + '/' + str(event_edition['instanceWithinYear'])
    event_edition_summary = get_event_edition_widget_info(event_edition_url)
    categories = []
    for award in event_edition_summary['awards']:
        if award['awardName']!='Oscar':
            continue
        
        for category in award['categories']:
            cat = get_category_info(category['categoryName'])
            for nomination in category['nominations']:
                candidate = {
                    'won': nomination['isWinner'],
                    'target': list(map(lambda nom: nom['name'], nomination['primaryNominees'])),
                    'target_enriched': list(map(get_nomination_enriched, nomination['primaryNominees'])),
                    'for': list(map(lambda nom: nom['name'], nomination['secondaryNominees'])),
                    'for_enriched': list(map(get_nomination_enriched, nomination['secondaryNominees'])),
                    'notes': nomination['notes']
                }
                cat['candidates'].append(candidate)
            categories.append(cat)
    with open(f'{result_folder}/{idx+1}.json', 'w') as outfile:
        json.dump(categories, outfile, indent=4)
    return {
        'year': event_edition['year'],
        'instance': event_edition['instanceWithinYear'],
        'categories': categories
    }
category_names = []    
event_editions_enriched = []
for idx, event_edition in enumerate(sorted(event_editions, key= lambda ev: str(ev['year']) + str(ev['instanceWithinYear']))):
    event_editions_enriched.append(store_event_edition(idx, event_edition))